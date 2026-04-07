/**
 * POST /api/gmail/disconnect
 * Clears the stored OAuth token and removes the cookie
 */

import { deleteTokens } from "@/lib/token-store"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()
  const tokenId = cookieStore.get("gmail_token_id")?.value

  if (tokenId) {
    deleteTokens(tokenId)
  }

  const response = NextResponse.json({ disconnected: true }, { status: 200 })
  response.cookies.delete("gmail_token_id")
  return response
}
