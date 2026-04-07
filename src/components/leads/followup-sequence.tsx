"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, RefreshCw, Loader2 } from "lucide-react";
import type { Lead } from "@/types/lead";
import type { FollowupResponse } from "@/types/ai";
import { FollowupTaskCard } from "@/components/followups/followup-task-card";
import { FollowUpTask } from "@/types/task";
import { buildFollowupTasksFromLead } from "@/lib/task-utils";

interface FollowupSequenceProps {
  lead: Lead;
}

const stepMeta = [
  { key: "step1" as const, label: "Day 1 — Initial follow-up", timing: "+1 day after first contact" },
  { key: "step2" as const, label: "Day 3 — Second follow-up", timing: "+3 days after first contact" },
  { key: "step3" as const, label: "Day 7 — Final follow-up", timing: "+7 days after first contact" },
];

export function FollowupSequence({ lead }: FollowupSequenceProps) {
  const [followups, setFollowups] = useState<FollowupResponse | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<FollowUpTask[]>([]);
  const [tasksCreated, setTasksCreated] = useState(false);

  useEffect(() => {
    async function loadLeadTasks() {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Unable to load tasks");
        const data = await res.json();
        const existing = (data.tasks as FollowUpTask[] | undefined) ?? [];
        const leadTasks = existing.filter((task) => task.leadId === lead.id);
        setTasks(leadTasks);
        setTasksCreated(leadTasks.length > 0);
      } catch (err) {
        console.error(err);
      }
    }

    loadLeadTasks();
  }, [lead.id]);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/generate-followups", {
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
      const data: FollowupResponse = await res.json();
      setFollowups(data);
      setEdits({ step1: data.step1, step2: data.step2, step3: data.step3 });
      setError(null);
    } catch {
      setError("Unable to generate follow-ups. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function createTasks() {
    if (!followups) return;
    setLoading(true);
    setError(null);
    try {
      const followupValues = {
        step1: edits.step1 || followups.step1,
        step2: edits.step2 || followups.step2,
        step3: edits.step3 || followups.step3,
      };
      const createdTasks = buildFollowupTasksFromLead(lead, followupValues);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: createdTasks }),
      });
      if (!res.ok) throw new Error("Failed to create tasks");
      const data = await res.json();
      setTasks(data.tasks || []);
      setTasksCreated(true);
    } catch (err) {
      console.error(err);
      setError("Unable to create follow-up tasks. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(task: FollowUpTask, status: "completed" | "sent" | "skipped") {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const data = await res.json();
      setTasks((prev) => prev.map((item) => (item.id === task.id ? data.task : item)));
    } catch (err) {
      console.error(err);
      setError("Unable to update task. Try again.");
    }
  }

  function handleEdit(key: string, value: string) {
    setEdits((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Follow-up Sequence
            </CardTitle>
            <p className="text-xs text-muted-foreground">Generate AI follow-up copy, then create tasks for day 1, 3, and 7.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1.5"
              onClick={generate}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : followups ? (
                <RefreshCw className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {followups ? "Regenerate" : "Generate Follow-ups"}
            </Button>
            {followups && (
              <Button
                variant={tasksCreated ? "secondary" : "default"}
                size="sm"
                className="h-7 text-xs"
                onClick={createTasks}
                disabled={loading || tasksCreated}
              >
                {tasksCreated ? "Tasks Created" : "Create Tasks"}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 mb-3">{error}</div>
        )}

        {loading && !followups && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Generating follow-up sequence...</p>
          </div>
        )}

        {!followups && !loading && !error && (
          <div className="space-y-3">
            {stepMeta.map((s) => (
              <div
                key={s.key}
                className="flex items-center gap-3 rounded-lg border border-dashed border-border p-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                  {s.key === "step1" ? 1 : s.key === "step2" ? 2 : 3}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.timing}</p>
                </div>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
            ))}
          </div>
        )}

        {followups && (
          <div className="space-y-4">
            {stepMeta.map((s, idx) => (
              <div key={s.key} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.timing}</p>
                  </div>
                </div>
                <Textarea
                  value={edits[s.key] ?? ""}
                  onChange={(e) => handleEdit(s.key, e.target.value)}
                  className="min-h-[80px] text-sm leading-relaxed"
                />
              </div>
            ))}
          </div>
        )}

        {tasks.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm font-semibold">Task summary</p>
              <p className="text-xs text-muted-foreground">
                {tasks.length} follow-up task{tasks.length !== 1 ? "s" : ""} created for this lead.
              </p>
            </div>
            {tasks.map((task) => (
              <FollowupTaskCard
                key={task.id}
                task={task}
                leadName={lead.name}
                propertyAddress={lead.propertyAddress}
                onSend={() => updateTask(task, "sent")}
                onComplete={() => updateTask(task, "completed")}
                onSkip={() => updateTask(task, "skipped")}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
