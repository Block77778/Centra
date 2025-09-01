import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get posts from followed users and own posts
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        *,
        profiles:author_id (
          username,
          display_name,
          avatar_url
        ),
        likes (
          user_id
        ),
        comments (count)
      `)
      .or(`author_id.eq.${user.id},author_id.in.(select following_id from follows where follower_id = ${user.id})`)
      .order("created_at", { ascending: false })

    if (error) throw error

    // Add engagement stats
    const postsWithStats = posts?.map((post) => ({
      ...post,
      likes_count: post.likes?.length || 0,
      comments_count: post.comments?.[0]?.count || 0,
      user_has_liked: post.likes?.some((like) => like.user_id === user.id) || false,
    }))

    return NextResponse.json({ posts: postsWithStats })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feed" }, { status: 500 })
  }
}
