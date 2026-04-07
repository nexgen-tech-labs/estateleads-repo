"use client"

import { ParsedEmail } from "@/types/gmail"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailRow } from "./email-row"
import { Mail } from "lucide-react"

interface EmailTableProps {
  emails: ParsedEmail[]
  isLoading?: boolean
  onImport?: (email: ParsedEmail) => void
}

export function EmailTable({ emails, isLoading, onImport }: EmailTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Emails from Gmail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading emails...</p>
        </CardContent>
      </Card>
    )
  }

  if (emails.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Emails from Gmail
          </CardTitle>
          <CardDescription>No emails found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No property enquiries found in your Gmail inbox. Try syncing again or check your label configuration.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Emails from Gmail
        </CardTitle>
        <CardDescription>
          {emails.length} email{emails.length !== 1 ? "s" : ""} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold">From</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Property</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <EmailRow
                  key={email.messageId}
                  email={email}
                  isImported={false}
                  onImport={onImport}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
