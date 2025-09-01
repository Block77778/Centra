import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

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
      .eq("post_id", params.id)
      .order("created_at", { ascending: true })

    if (error) throw error

    return NextResponse.json({ comments })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content } = await request.json()

    const { data: comment, error } = await supabase
      .from("comments")
      .insert({
        post_id: params.id,
        author_id: user.id,
        content,
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

    return NextResponse.json({ comment })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
