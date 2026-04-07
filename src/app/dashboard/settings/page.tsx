"use client"

import { useAuth } from "@/context/auth-context"
import { SettingsForm } from "@/components/settings/settings-form"

export default function SettingsPage() {
  const { profile } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your agency and account settings
        </p>
      </div>

      <SettingsForm
        agencyName={profile?.agencyName ?? ""}
        userName={profile?.name ?? ""}
        userEmail={profile?.email ?? ""}
        userRole="Admin"
      />
    </div>
  )
}
