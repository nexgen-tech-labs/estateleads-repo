/**
 * POST /api/gmail/disconnect
 * Clears the stored OAuth token and removes the cookie
 */

import { COOKIE_NAME } from "@/lib/token-store"
import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ disconnected: true }, { status: 200 })
  response.cookies.delete(COOKIE_NAME)
  return response
}
