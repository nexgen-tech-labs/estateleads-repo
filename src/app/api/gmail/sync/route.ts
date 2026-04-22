/**
 * GET  /api/gmail/sync  — check connection status
 * POST /api/gmail/sync  — fetch emails from Gmail
 */

import { fetchEmailsByLabel } from "@/lib/gmail"
import { parseGmailMessage } from "@/lib/email-parser"
import { decodeTokens, COOKIE_NAME } from "@/lib/token-store"
import { GmailSyncResult } from "@/types/gmail"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

async function getTokensFromCookie() {
  const cookieStore = await cookies()
  const encoded = cookieStore.get(COOKIE_NAME)?.value
  if (!encoded) return null
  return decodeTokens(encoded)
}

export async function GET() {
  try {
    const tokens = await getTokensFromCookie()
    if (!tokens?.access_token) {
      return NextResponse.json({ connected: false }, { status: 200 })
    }
    return NextResponse.json(
      { connected: true, email: tokens.email ?? null },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error checking Gmail connection:", error)
    return NextResponse.json({ connected: false }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokens = await getTokensFromCookie()
    if (!tokens?.access_token) {
      return NextResponse.json(
        { error: "Gmail not connected. Please connect first." },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { label = "Property Enquiries", maxResults = 20 } = body

    const messages = await fetchEmailsByLabel(tokens.access_token, label, maxResults)
    const parsedEmails = messages.map((msg) => parseGmailMessage(msg))

    const result: GmailSyncResult = {
      success: true,
      messagesCount: parsedEmails.length,
      messages: parsedEmails,
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error syncing emails:", error)
    return NextResponse.json(
      {
        success: false,
        messagesCount: 0,
        messages: [],
        error: error instanceof Error ? error.message : "Failed to sync emails from Gmail",
      },
      { status: 500 }
    )
  }
}
