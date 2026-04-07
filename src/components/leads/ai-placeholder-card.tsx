import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";

export function AiSummaryPlaceholder() {
  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-8 text-center">
          <Sparkles className="h-8 w-8 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            AI summary will appear here
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Coming in Day 3
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AiReplyPlaceholder() {
  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Wand2 className="h-4 w-4 text-muted-foreground" />
            Draft Reply
          </CardTitle>
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
            Generate AI Reply
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[120px] rounded-lg border border-dashed border-border p-4 text-center flex flex-col items-center justify-center">
          <Wand2 className="h-8 w-8 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            AI-generated reply will appear here
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Click "Generate AI Reply" once enabled
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function FollowUpSequencePlaceholder() {
  const steps = [
    { step: 1, label: "Day 1 — Initial follow-up", timing: "+1 day after first contact" },
    { step: 2, label: "Day 3 — Second follow-up", timing: "+3 days after first contact" },
    { step: 3, label: "Day 7 — Final follow-up", timing: "+7 days after first contact" },
  ];

  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Follow-up Sequence</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex items-center gap-3 rounded-lg border border-dashed border-border p-3"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                {s.step}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.timing}</p>
              </div>
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
