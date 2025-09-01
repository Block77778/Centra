"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

interface Post {
  id: string
  content: string
  image_url?: string
  created_at: string
  author_id: string
  profiles: {
    username: string
    display_name: string
    avatar_url?: string
  }
  likes_count: number
  comments_count: number
  user_has_liked: boolean
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        const data = await response.json()

        if (data.error) throw new Error(data.error)
        setPosts(data.posts || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()

    const postsSubscription = supabase
      .channel("posts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        () => {
          fetchPosts() // Refetch posts on any change
        },
      )
      .subscribe()

    const likesSubscription = supabase
      .channel("likes_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
        },
        () => {
          fetchPosts() // Refetch posts when likes change
        },
      )
      .subscribe()

    return () => {
      postsSubscription.unsubscribe()
      likesSubscription.unsubscribe()
    }
  }, [])

  return { posts, loading, error, refetch: () => window.location.reload() }
}
