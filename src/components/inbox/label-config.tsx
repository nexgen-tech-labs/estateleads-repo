"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tag } from "lucide-react"
import { useState } from "react"

interface LabelConfigProps {
  initialLabel?: string
  onSave?: (label: string) => void
}

export function LabelConfig({ initialLabel = "Property Enquiries", onSave }: LabelConfigProps) {
  const [label, setLabel] = useState(initialLabel)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    if (onSave) {
      onSave(label)
    }
    setIsSaving(false)
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
          {isSaving ? "Saving..." : "Save Label"}
        </Button>
      </CardContent>
    </Card>
  )
}
