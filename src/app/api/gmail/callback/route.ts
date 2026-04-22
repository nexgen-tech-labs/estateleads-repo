/**
 * GET /api/gmail/callback
 * OAuth callback handler - exchanges code for tokens
 */

import { getTokensFromCode, getGmailUserEmail } from "@/lib/gmail"
import { encodeTokens, COOKIE_NAME } from "@/lib/token-store"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard/inbox?error=${encodeURIComponent(error)}`, request.url)
    )
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/dashboard/inbox?error=No+authorization+code+received", request.url)
    )
  }

  try {
    const tokens = await getTokensFromCode(code)
    const email = tokens.access_token
      ? await getGmailUserEmail(tokens.access_token)
      : undefined

    const response = NextResponse.redirect(
      new URL(
        `/dashboard/inbox?connected=true&email=${encodeURIComponent(email ?? "")}`,
        request.url
      )
    )
    response.cookies.set(COOKIE_NAME, encodeTokens({ ...tokens, email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error exchanging code for tokens:", error)
    return NextResponse.redirect(
      new URL("/dashboard/inbox?error=Failed+to+authenticate+with+Gmail", request.url)
    )
  }
}
