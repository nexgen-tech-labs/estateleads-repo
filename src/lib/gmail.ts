/**
 * Gmail API Integration Helper
 */

import { GmailMessage, ParsedEmail } from "@/types/gmail"
import { google } from "googleapis"

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/gmail/callback"
)

export function getAuthUrl(): string {
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
  ]

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  })

  return authUrl
}

export async function getGmailUserEmail(accessToken: string): Promise<string | undefined> {
  try {
    oauth2Client.setCredentials({ access_token: accessToken })
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client })
    const { data } = await oauth2.userinfo.get()
    return data.email ?? undefined
  } catch (error) {
    console.error("Error fetching Gmail user email:", error)
    return undefined
  }
}

export async function getTokensFromCode(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code)
    return tokens
  } catch (error) {
    console.error("Error exchanging code for tokens:", error)
    throw error
  }
}

export async function fetchEmailsByLabel(
  accessToken: string,
  label: string = "Property Enquiries",
  maxResults: number = 20
): Promise<GmailMessage[]> {
  try {
    oauth2Client.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: "v1", auth: oauth2Client })

    // Get label ID from label name
    const labelsResponse = await gmail.users.labels.list({ userId: "me" })
    const labelId = labelsResponse.data.labels?.find(
      (l) => l.name === label
    )?.id

    if (!labelId) {
      console.warn(`Label "${label}" not found`)
      return []
    }

    // Fetch messages from label
    const messagesResponse = await gmail.users.messages.list({
      userId: "me",
      labelIds: [labelId],
      maxResults,
      q: "is:unread",
    })

    const messageIds = messagesResponse.data.messages || []

    // Fetch full message details
    const messages = await Promise.all(
      messageIds.map((msg) =>
        gmail.users.messages.get({
          userId: "me",
          id: msg.id || "",
          format: "full",
        })
      )
    )

    return messages.map((msg) => msg.data as GmailMessage)
  } catch (error) {
    console.error("Error fetching emails from Gmail:", error)
    throw error
  }
}

export async function getMessageDetails(
  accessToken: string,
  messageId: string
): Promise<GmailMessage | null> {
  try {
    oauth2Client.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: "v1", auth: oauth2Client })

    const message = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "full",
    })

    return message.data as GmailMessage
  } catch (error) {
    console.error("Error fetching message details:", error)
    return null
  }
}

export async function sendEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string
): Promise<boolean> {
  try {
    oauth2Client.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: "v1", auth: oauth2Client })

    const email = `To: ${to}\r\nSubject: ${subject}\r\n\r\n${body}`
    const base64Email = Buffer.from(email).toString("base64")

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64Email,
      },
    })

    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}
