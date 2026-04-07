/**
 * GET /api/gmail/connect
 * Returns OAuth URL for Gmail connection
 */

import { getAuthUrl } from "@/lib/gmail"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const authUrl = getAuthUrl()
    return NextResponse.json({ authUrl }, { status: 200 })
  } catch (error) {
    console.error("Error generating auth URL:", error)
    return NextResponse.json(
      { error: "Failed to generate auth URL" },
      { status: 500 }
    )
  }
}
