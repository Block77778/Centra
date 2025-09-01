import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

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

    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, image_url } = await request.json()

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        author_id: user.id,
        content,
        image_url,
      })
      .select(`
        *,
        profiles:author_id (
          username,
          display_name,
          avatar_url
        )
      `)
      .single()

    if (error) throw error

    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
