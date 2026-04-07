/**
 * Email Parser - Converts Gmail messages to Lead structure
 */

import { GmailMessage, ParsedEmail } from "@/types/gmail"

function decodeBase64(str: string): string {
  try {
    return Buffer.from(str, "base64").toString("utf-8")
  } catch {
    return str
  }
}

function getHeaderValue(
  headers: Array<{ name: string; value: string }>,
  name: string
): string {
  return headers.find((h) => h.name.toLowerCase() === name.toLowerCase())
    ?.value || ""
}

function extractEmailName(email: string): string {
  // Try to extract name from email address
  const parts = email.split("<")
  if (parts.length > 1) {
    return parts[0].trim()
  }
  // Fallback: use part before @
  return email.split("@")[0].replace(/[._-]/g, " ").trim()
}

function extractPropertyAddress(body: string): string | undefined {
  // Simple pattern matching for common UK address formats
  const addressPatterns = [
    /(?:address|property|address):\s*([^\n]+)/i,
    /\d+\s+[A-Za-z\s]+(?:Road|Street|Avenue|Drive|Lane|Close|Court|Place|Park|Hill|Mount|Green|Square|Terrace|Way|Gardens|Heights|View|Crescent)/i,
    /\b[A-Za-z]+(?:\s+[A-Za-z]+)*,\s*[A-Za-z]+(?:\s+[A-Za-z]+)*\s+\d{1,2}\s+[A-Z]{1,2}\s+\d[A-Z]{1,2}\b/,
  ]

  for (const pattern of addressPatterns) {
    const match = body.match(pattern)
    if (match) {
      return match[0].substring(0, 100).trim()
    }
  }

  return undefined
}

export function parseGmailMessage(message: GmailMessage): ParsedEmail {
  const headers = message.payload?.headers || []

  const senderEmail = getHeaderValue(headers, "from")
  const subject = getHeaderValue(headers, "subject")
  const internalDate = message.internalDate

  // Extract body from payload
  let body = ""

  if (message.payload?.body?.data) {
    body = decodeBase64(message.payload.body.data)
  } else if (message.payload?.parts) {
    // Try to find the text part
    const textPart = message.payload.parts.find(
      (part) => part.mimeType === "text/plain"
    )
    if (textPart?.body?.data) {
      body = decodeBase64(textPart.body.data)
    }
  }

  // Clean up body (remove quotes and signatures)
  const bodyLines = body.split("\n").slice(0, 15).join("\n").trim()

  const senderName = extractEmailName(senderEmail)
  const propertyAddress = extractPropertyAddress(bodyLines)

  return {
    senderName,
    senderEmail,
    subject,
    body: bodyLines,
    propertyAddress,
    receivedTime: new Date(parseInt(internalDate)).toISOString(),
    messageId: message.id,
    source: "gmail",
  }
}
