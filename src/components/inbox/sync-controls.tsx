"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"

interface SyncControlsProps {
  isConnected: boolean
  onSync?: (label: string) => Promise<any>
  lastSyncedAt?: string
}

export function SyncControls({
  isConnected,
  onSync,
  lastSyncedAt,
}: SyncControlsProps) {
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    if (!onSync) return

    setIsSyncing(true)
    try {
      await onSync("Property Enquiries")
    } catch (error) {
      console.error("Sync error:", error)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Sync Controls
        </CardTitle>
        <CardDescription>
          Manually sync emails from your Gmail inbox
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastSyncedAt && (
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              Last synced:{" "}
              <span className="font-medium">
                {new Date(lastSyncedAt).toLocaleString()}
              </span>
            </p>
          </div>
        )}
        <Button
          onClick={handleSync}
          disabled={!isConnected || isSyncing}
          className="w-full"
        >
          {isSyncing ? "Syncing..." : "Sync Now"}
        </Button>
        {!isConnected && (
          <p className="text-xs text-muted-foreground">
            Connect Gmail first to enable syncing
          </p>
        )}
      </CardContent>
    </Card>
  )
}
