"use client"

import { InboxContent } from "@/components/inbox/inbox-content"
import { Suspense } from "react"

export default function InboxPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InboxContent />
    </Suspense>
  )
}
