/**
 * Cookie-based Gmail token helpers.
 * Tokens are stored directly in a secure httpOnly cookie as base64 JSON —
 * survives serverless cold starts unlike the previous in-memory Map.
 */

export interface GmailTokens {
  access_token?: string | null
  refresh_token?: string | null
  expiry_date?: number | null
  token_type?: string | null
  email?: string
}

export const COOKIE_NAME = "gmail_tokens"

export function encodeTokens(tokens: GmailTokens): string {
  return Buffer.from(JSON.stringify(tokens)).toString("base64")
}

export function decodeTokens(encoded: string): GmailTokens | null {
  try {
    return JSON.parse(Buffer.from(encoded, "base64").toString("utf-8")) as GmailTokens
  } catch {
    return null
  }
}
