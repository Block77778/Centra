import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    const { data: following, error } = await supabase
      .from("follows")
      .select(`
        following_id,
        created_at,
        profiles:following_id (
          id,
          username,
          display_name,
          avatar_url,
          bio
        )
      `)
      .eq("follower_id", params.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ following })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch following" }, { status: 500 })
  }
}
