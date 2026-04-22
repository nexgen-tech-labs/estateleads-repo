import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const destination = new URL("/api/gmail/callback" + url.search, url.origin)
  return NextResponse.redirect(destination)
}
