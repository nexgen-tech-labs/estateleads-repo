/**
 * Gmail Integration Types
 */

export interface GmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  internalDate: string
  payload?: {
    headers: Array<{
      name: string
      value: string
    }>
    parts?: Array<{
      partId: string
      mimeType: string
      body?: {
        size: number
        data?: string
      }
    }>
    body?: {
      size: number
      data?: string
    }
  }
}

export interface GmailThread {
  id: string
  snippet: string
  messages: GmailMessage[]
}

export interface ParsedEmail {
  senderName: string
  senderEmail: string
  subject: string
  body: string
  propertyAddress?: string
  receivedTime: string
  messageId: string
  source: "gmail"
}

export interface InboxConnection {
  connected: boolean
  email?: string
  accessToken?: string
  refreshToken?: string
  connectedAt?: string
  expiresAt?: string
}

export interface GmailSyncResult {
  success: boolean
  messagesCount: number
  messages: ParsedEmail[]
  error?: string
}

export interface ImportLeadFromEmailResult {
  success: boolean
  leadId?: string
  message?: string
  error?: string
}
