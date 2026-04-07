"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2, User } from "lucide-react"

interface SettingsFormProps {
  agencyName: string
  userName: string
  userEmail: string
  userRole?: string
}

const timezones = [
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Dublin", label: "Dublin (GMT/IST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
]

export function SettingsForm({
  agencyName: initialAgencyName,
  userName: initialUserName,
  userEmail,
  userRole = "Admin",
}: SettingsFormProps) {
  const [agencyName, setAgencyName] = useState(initialAgencyName)
  const [defaultInbox, setDefaultInbox] = useState("")
  const [timezone, setTimezone] = useState("Europe/London")
  const [officeHours, setOfficeHours] = useState("Mon–Fri, 9am–6pm")
  const [userName, setUserName] = useState(initialUserName)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: persist to Firestore via API route
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Agency Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Agency Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="agencyName">Agency name</Label>
              <Input
                id="agencyName"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                placeholder="Harbour Homes"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="defaultInbox">Default inbox email</Label>
              <Input
                id="defaultInbox"
                type="email"
                value={defaultInbox}
                onChange={(e) => setDefaultInbox(e.target.value)}
                placeholder="enquiries@youragency.co.uk"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Timezone</Label>
              <Select value={timezone} onValueChange={(v) => setTimezone(v ?? "Europe/London")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="officeHours">Office hours</Label>
              <Input
                id="officeHours"
                value={officeHours}
                onChange={(e) => setOfficeHours(e.target.value)}
                placeholder="Mon–Fri, 9am–6pm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4 text-muted-foreground" />
            User Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="userName">Full name</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="userEmail">Email</Label>
              <Input id="userEmail" type="email" value={userEmail} disabled className="opacity-60" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Role</span>
            <Badge variant="secondary" className="text-xs">{userRole}</Badge>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button size="sm" onClick={handleSave}>
              {saved ? "Saved!" : "Save changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
