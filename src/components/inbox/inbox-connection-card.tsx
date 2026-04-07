"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GmailConnectButton } from "./gmail-connect-button"
import { CheckCircle, Mail } from "lucide-react"
import { useEffect, useState } from "react"

interface InboxConnectionCardProps {
  isConnected: boolean
  email?: string
}

export function InboxConnectionCard({
  isConnected: initialConnected,
  email: initialEmail,
}: InboxConnectionCardProps) {
  const [isConnected, setIsConnected] = useState(initialConnected)
  const [email, setEmail] = useState(initialEmail)

  useEffect(() => {
    setIsConnected(initialConnected)
    setEmail(initialEmail)
  }, [initialConnected, initialEmail])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Gmail Connection
        </CardTitle>
        <CardDescription>
          Connect your Gmail inbox to import property enquiries
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-900">Connected</p>
                <p className="text-sm text-emerald-700">{email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                await fetch("/api/gmail/disconnect", { method: "POST" })
                setIsConnected(false)
                setEmail(undefined)
              }}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Click below to authorize access to your Gmail inbox. We'll only access property enquiries from your designated label.
            </p>
            <GmailConnectButton />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
