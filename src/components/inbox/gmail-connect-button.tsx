"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function GmailConnectButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/gmail/connect")
      const data = await response.json()

      if (data.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error("Error connecting to Gmail:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className="w-full sm:w-auto"
    >
      {isLoading ? "Connecting..." : "Connect Gmail"}
    </Button>
  )
}
