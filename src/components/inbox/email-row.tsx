"use client"

import { ParsedEmail } from "@/types/gmail"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"

interface EmailRowProps {
  email: ParsedEmail
  isImported?: boolean
  onImport?: (email: ParsedEmail) => void
}

export function EmailRow({ email, isImported, onImport }: EmailRowProps) {
  const formattedDate = new Date(email.receivedTime).toLocaleDateString()

  return (
    <tr className="border-b last:border-b-0">
      <td className="px-4 py-3">
        <p className="font-medium text-sm">{email.senderName}</p>
        <p className="text-xs text-muted-foreground">{email.senderEmail}</p>
      </td>
      <td className="px-4 py-3 max-w-xs">
        <p className="text-sm font-medium truncate">{email.subject}</p>
        <p className="text-xs text-muted-foreground truncate">
          {email.body.substring(0, 60)}...
        </p>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {email.propertyAddress || "—"}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
        {formattedDate}
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isImported
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {isImported ? "Imported" : "Not Imported"}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        {!isImported && onImport && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onImport(email)}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Create Lead
          </Button>
        )}
      </td>
    </tr>
  )
}
