import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    const { data: profile, error } = await supabase
      .from("profiles")
      .select(`
        *,
        posts (count),
        followers:follows!following_id (count),
        following:follows!follower_id (count)
      `)
      .eq("id", params.id)
      .single()

    if (error) throw error

    return NextResponse.json({ profile })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
