"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tag } from "lucide-react"
import { useEffect, useState } from "react"

const STORAGE_KEY = "gmail_label"
const DEFAULT_LABEL = "Property Enquiries"

interface LabelConfigProps {
  onSave?: (label: string) => void
}

export function LabelConfig({ onSave }: LabelConfigProps) {
  const [label, setLabel] = useState(DEFAULT_LABEL)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setLabel(stored)
      onSave?.(stored)
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    localStorage.setItem(STORAGE_KEY, label)
    onSave?.(label)
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Gmail Label Configuration
        </CardTitle>
        <CardDescription>
          Specify which Gmail label contains your property enquiries
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Label Name</Label>
          <Input
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g., Property Enquiries, Leads, etc."
          />
          <p className="text-xs text-muted-foreground">
            The exact name of your Gmail label (case-sensitive)
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving || !label.trim()}>
          {saved ? "Saved!" : isSaving ? "Saving..." : "Save Label"}
        </Button>
      </CardContent>
    </Card>
  )
}
