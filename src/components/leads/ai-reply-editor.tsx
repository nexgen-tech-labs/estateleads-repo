"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Wand2, RefreshCw, Loader2, Copy, Check } from "lucide-react";
import type { Lead } from "@/types/lead";
import type { ReplyResponse } from "@/types/ai";

interface AiReplyEditorProps {
  lead: Lead;
}

export function AiReplyEditor({ lead }: AiReplyEditorProps) {
  const [reply, setReply] = useState<ReplyResponse | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName: lead.name,
          property: lead.propertyAddress,
          message: lead.message,
          agencyName: "Harbour Homes",
        }),
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data: ReplyResponse = await res.json();
      setReply(data);
      setSubject(data.subject);
      setBody(data.body);
    } catch {
      setError("Unable to generate reply. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    const text = `Subject: ${subject}\n\n${body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Wand2 className="h-4 w-4 text-muted-foreground" />
            Draft Reply
          </CardTitle>
          <div className="flex gap-1.5">
            {reply && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1.5"
              onClick={generate}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : reply ? (
                <RefreshCw className="h-3 w-3" />
              ) : (
                <Wand2 className="h-3 w-3" />
              )}
              {reply ? "Regenerate" : "Generate Reply"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 mb-3">{error}</div>
        )}

        {loading && !reply && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Drafting reply...</p>
          </div>
        )}

        {!reply && !loading && !error && (
          <div className="min-h-[120px] rounded-lg border border-dashed border-border p-4 text-center flex flex-col items-center justify-center">
            <Wand2 className="h-8 w-8 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">
              Click &quot;Generate Reply&quot; to draft an email response
            </p>
          </div>
        )}

        {reply && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Subject</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Message</Label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[180px] text-sm leading-relaxed"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
