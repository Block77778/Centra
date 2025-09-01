import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string; commentId: string } }) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("comments").delete().eq("id", params.commentId).eq("author_id", user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string; commentId: string } }) {
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
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", params.commentId)
      .eq("author_id", user.id)
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
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 })
  }
}
