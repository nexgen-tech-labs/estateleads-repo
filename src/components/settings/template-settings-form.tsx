"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Palette, PenLine, Clock, Brain } from "lucide-react"

export function TemplateSettingsForm() {
  const [tone, setTone] = useState("professional")
  const [signature, setSignature] = useState(
    "Kind regards,\n[Your Name]\nHarbour Homes\nT: 023 9200 0000\nE: enquiries@harbourhomes.co.uk"
  )
  const [day1, setDay1] = useState("1")
  const [day2, setDay2] = useState("3")
  const [day3, setDay3] = useState("7")
  const [buyerNotes, setBuyerNotes] = useState(
    "Focus on: viewing availability, chain status, mortgage in principle. Keep replies warm and action-oriented."
  )
  const [sellerNotes, setSellerNotes] = useState(
    "Focus on: valuation booking, market context, our marketing approach. Position as trusted advisor."
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: persist to Firestore
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Email Tone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4 text-muted-foreground" />
            Email Tone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label>Default reply tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v ?? "professional")}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {tone === "professional" && "Formal and polished — ideal for high-value properties."}
              {tone === "friendly" && "Warm and approachable — builds rapport quickly."}
              {tone === "direct" && "Concise and to the point — great for busy buyers."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Signature Block */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PenLine className="h-4 w-4 text-muted-foreground" />
            Signature Block
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label htmlFor="signature">Email signature</Label>
            <Textarea
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              rows={5}
              className="font-mono text-sm"
              placeholder="Kind regards,&#10;Your Name&#10;Agency Name"
            />
            <p className="text-xs text-muted-foreground">
              Appended to all AI-generated replies.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Follow-up Cadence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Follow-up Cadence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Number of days after initial contact for each follow-up step.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="day1">Step 1 (days)</Label>
              <Input
                id="day1"
                type="number"
                min="1"
                max="30"
                value={day1}
                onChange={(e) => setDay1(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="day2">Step 2 (days)</Label>
              <Input
                id="day2"
                type="number"
                min="1"
                max="30"
                value={day2}
                onChange={(e) => setDay2(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="day3">Step 3 (days)</Label>
              <Input
                id="day3"
                type="number"
                min="1"
                max="30"
                value={day3}
                onChange={(e) => setDay3(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4 text-muted-foreground" />
            AI Prompt Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="buyerNotes">Buyer enquiries — instructions for AI</Label>
            <Textarea
              id="buyerNotes"
              value={buyerNotes}
              onChange={(e) => setBuyerNotes(e.target.value)}
              rows={3}
              placeholder="e.g. Always ask for viewing availability and mortgage status..."
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sellerNotes">Seller enquiries — instructions for AI</Label>
            <Textarea
              id="sellerNotes"
              value={sellerNotes}
              onChange={(e) => setSellerNotes(e.target.value)}
              rows={3}
              placeholder="e.g. Emphasise valuation accuracy and our marketing reach..."
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave}>
          {saved ? "Saved!" : "Save settings"}
        </Button>
      </div>
    </div>
  )
}
