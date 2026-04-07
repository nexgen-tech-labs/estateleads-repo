"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Loader2, Flame, Thermometer, Snowflake } from "lucide-react";
import type { Lead } from "@/types/lead";
import type { LeadSummaryResponse } from "@/types/ai";

interface AiSummaryCardProps {
  lead: Lead;
}

const tempConfig = {
  hot: { label: "Hot", icon: Flame, className: "bg-red-50 text-red-700 border-red-200" },
  warm: { label: "Warm", icon: Thermometer, className: "bg-orange-50 text-orange-700 border-orange-200" },
  cold: { label: "Cold", icon: Snowflake, className: "bg-blue-50 text-blue-700 border-blue-200" },
};

export function AiSummaryCard({ lead }: AiSummaryCardProps) {
  const [summary, setSummary] = useState<LeadSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/summarize-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName: lead.name,
          property: lead.propertyAddress,
          message: lead.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data: LeadSummaryResponse = await res.json();
      setSummary(data);
    } catch {
      setError("Unable to generate summary. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const temp = summary ? tempConfig[summary.temperature] ?? tempConfig.warm : null;

  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            AI Summary
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1.5"
            onClick={generate}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : summary ? (
              <RefreshCw className="h-3 w-3" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            {summary ? "Regenerate" : "Generate Summary"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        {loading && !summary && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Analysing enquiry...</p>
          </div>
        )}

        {!summary && !loading && !error && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-8 text-center">
            <Sparkles className="h-8 w-8 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">
              Click &quot;Generate Summary&quot; to analyse this enquiry
            </p>
          </div>
        )}

        {summary && (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed">{summary.summary}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary/50 p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lead Type</p>
                <p className="text-sm font-medium capitalize">{summary.leadType}</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Temperature</p>
                <div className="mt-0.5">
                  {temp && (
                    <Badge variant="outline" className={`text-xs ${temp.className}`}>
                      <temp.icon className="mr-1 h-3 w-3" />
                      {temp.label}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Timeline</p>
                <p className="text-sm font-medium">{summary.timeline || "Not specified"}</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Next Action</p>
                <p className="text-sm font-medium">{summary.nextAction}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
