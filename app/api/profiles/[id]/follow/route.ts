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

    if (user.id === params.id) {
      return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 })
    }

    const { data: existingFollow } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", params.id)
      .single()

    if (existingFollow) {
      // Unfollow
      const { error } = await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", params.id)

      if (error) throw error
      return NextResponse.json({ following: false })
    } else {
      // Follow
      const { error } = await supabase.from("follows").insert({
        follower_id: user.id,
        following_id: params.id,
      })

      if (error) throw error
      return NextResponse.json({ following: true })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle follow" }, { status: 500 })
  }
}
