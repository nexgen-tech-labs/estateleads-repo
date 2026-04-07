"use client"

import { InboxConnectionCard } from "@/components/inbox/inbox-connection-card"
import { LabelConfig } from "@/components/inbox/label-config"
import { SyncControls } from "@/components/inbox/sync-controls"
import { EmailTable } from "@/components/inbox/email-table"
import { ParsedEmail } from "@/types/gmail"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function InboxContent() {
  const searchParams = useSearchParams()
  const [isConnected, setIsConnected] = useState(false)
  const [connectedEmail, setConnectedEmail] = useState<string>()
  const [gmailLabel, setGmailLabel] = useState("Property Enquiries")
  const [emails, setEmails] = useState<ParsedEmail[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastSyncedAt, setLastSyncedAt] = useState<string>()

  // Check connection status from URL params and API
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/gmail/sync")
        const data = await response.json()
        setIsConnected(data.connected || false)
        if (data.connected && data.email) {
          setConnectedEmail(data.email)
        }
      } catch (error) {
        console.error("Error checking connection:", error)
        setIsConnected(false)
      }
    }

    if (searchParams.get("connected") === "true") {
      setIsConnected(true)
      const emailFromUrl = searchParams.get("email")
      if (emailFromUrl) setConnectedEmail(emailFromUrl)
      checkConnection() // also hit API to get email if not in URL
    } else {
      checkConnection()
    }
  }, [searchParams])

  const handleSync = async (label: string) => {
    if (!isConnected) {
      alert("Please connect Gmail first before syncing.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/gmail/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, maxResults: 20 }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Sync failed with status ${response.status}`)
      }

      const data = await response.json()
      setEmails(data.messages || [])
      setLastSyncedAt(new Date().toISOString())
    } catch (error) {
      console.error("Sync error:", error)
      alert(`Failed to sync emails: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImportEmail = async (email: ParsedEmail) => {
    try {
      const response = await fetch("/api/gmail/import-to-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Import failed")
      }

      const data = await response.json()
      alert(`Lead "${data.lead.name}" created successfully!`)

      // Remove from table
      setEmails(emails.filter((e) => e.messageId !== email.messageId))
    } catch (error) {
      console.error("Import error:", error)
      alert("Failed to create lead. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Inbox</h1>
        <p className="text-sm text-muted-foreground">
          Connect and manage your email inbox
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <InboxConnectionCard
          isConnected={isConnected}
          email={connectedEmail}
        />
        <LabelConfig
          initialLabel={gmailLabel}
          onSave={(label) => setGmailLabel(label)}
        />
      </div>

      <SyncControls
        isConnected={isConnected}
        onSync={handleSync}
        lastSyncedAt={lastSyncedAt}
      />

      <EmailTable
        emails={emails}
        isLoading={isLoading}
        onImport={handleImportEmail}
      />
    </div>
  )
}
