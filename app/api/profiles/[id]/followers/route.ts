import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    const { data: followers, error } = await supabase
      .from("follows")
      .select(`
        follower_id,
        created_at,
        profiles:follower_id (
          id,
          username,
          display_name,
          avatar_url,
          bio
        )
      `)
      .eq("following_id", params.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ followers })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch followers" }, { status: 500 })
  }
}
