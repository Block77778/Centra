import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", params.id)
      .eq("user_id", user.id)
      .single()

    if (existingLike) {
      // Unlike
      const { error } = await supabase.from("likes").delete().eq("post_id", params.id).eq("user_id", user.id)

      if (error) throw error
      return NextResponse.json({ liked: false })
    } else {
      // Like
      const { error } = await supabase.from("likes").insert({
        post_id: params.id,
        user_id: user.id,
      })

      if (error) throw error
      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}
