"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export interface Post {
  id: string
  author_id: string
  content: string
  image_url?: string
  created_at: string
  profiles: {
    username: string
    display_name: string
    avatar_url?: string
  }
  likes_count?: number
  comments_count?: number
  user_has_liked?: boolean
}

export interface Comment {
  id: string
  post_id: string
  author_id: string
  content: string
  created_at: string
  profiles: {
    username: string
    display_name: string
    avatar_url?: string
  }
}

export function useRealtimePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Initial fetch
    fetchPosts()

    // Set up real-time subscription
    const channel = supabase
      .channel("posts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("[v0] Real-time post change:", payload)
          if (payload.eventType === "INSERT") {
            fetchPosts() // Refetch to get complete data with joins
          } else if (payload.eventType === "DELETE") {
            setPosts((current) => current.filter((post) => post.id !== payload.old.id))
          } else if (payload.eventType === "UPDATE") {
            fetchPosts() // Refetch for updates
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
        },
        () => {
          console.log("[v0] Real-time like change")
          fetchPosts() // Refetch to update like counts
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        () => {
          console.log("[v0] Real-time comment change")
          fetchPosts() // Refetch to update comment counts
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPosts = async () => {
    try {
      const { data: posts, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles:author_id (
            username,
            display_name,
            avatar_url
          ),
          likes (count),
          comments (count)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Transform data to match expected format
      const transformedPosts =
        posts?.map((post) => ({
          ...post,
          likes_count: post.likes?.[0]?.count || 0,
          comments_count: post.comments?.[0]?.count || 0,
          user_has_liked: false, // Will be updated by separate query
        })) || []

      setPosts(transformedPosts)
    } catch (error) {
      console.error("[v0] Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return { posts, loading, refetch: fetchPosts }
}

export function useRealtimeComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!postId) return

    // Initial fetch
    fetchComments()

    // Set up real-time subscription
    const channel = supabase
      .channel(`comments_${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          console.log("[v0] Real-time comment change:", payload)
          if (payload.eventType === "INSERT") {
            fetchComments()
          } else if (payload.eventType === "DELETE") {
            setComments((current) => current.filter((comment) => comment.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [postId])

  const fetchComments = async () => {
    if (!postId) return

    try {
      const { data: comments, error } = await supabase
        .from("comments")
        .select(`
          *,
          profiles:author_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: true })

      if (error) throw error
      setComments(comments || [])
    } catch (error) {
      console.error("[v0] Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  return { comments, loading, refetch: fetchComments }
}
