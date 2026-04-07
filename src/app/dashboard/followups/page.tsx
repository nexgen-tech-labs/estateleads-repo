"use client";

import { useEffect, useMemo, useState } from "react";
import { TaskGroupSection } from "@/components/followups/task-group-section";
import { FollowUpTask, TaskGroup } from "@/types/task";
import { getTaskGroup } from "@/lib/task-utils";
import { useAuth } from "@/context/auth-context";
import { getLeads } from "@/lib/firestore/leads";

type EnrichedTask = FollowUpTask & {
  leadName: string;
  propertyAddress: string;
};

export default function FollowupsPage() {
  const { profile } = useAuth();
  const [tasks, setTasks] = useState<FollowUpTask[]>([]);
  const [leadMap, setLeadMap] = useState<Map<string, { leadName: string; propertyAddress: string }>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile?.agencyId) return;
    async function loadData() {
      setIsLoading(true);
      try {
        const [tasksRes, leads] = await Promise.all([
          fetch("/api/tasks"),
          getLeads(profile!.agencyId),
        ]);
        if (!tasksRes.ok) throw new Error("Unable to load tasks");
        const data = await tasksRes.json();
        setTasks(data.tasks || []);
        const map = new Map<string, { leadName: string; propertyAddress: string }>();
        for (const lead of leads) {
          map.set(lead.id, { leadName: lead.name, propertyAddress: lead.propertyAddress });
        }
        setLeadMap(map);
      } catch (err) {
        console.error(err);
        setError("Unable to load follow-up tasks.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [profile?.agencyId]);

  const enrichedTasks: EnrichedTask[] = tasks
    .map((task) => ({
      ...task,
      leadName: leadMap.get(task.leadId)?.leadName ?? "Unknown lead",
      propertyAddress: leadMap.get(task.leadId)?.propertyAddress ?? "",
    }))
    .filter((task) => task.leadName !== "Unknown lead");

  const groupedTasks: Record<TaskGroup, EnrichedTask[]> = useMemo(
    () => ({
      due: enrichedTasks.filter((task) => getTaskGroup(task) === "due"),
      overdue: enrichedTasks.filter((task) => getTaskGroup(task) === "overdue"),
      upcoming: enrichedTasks.filter((task) => getTaskGroup(task) === "upcoming"),
    }),
    [enrichedTasks]
  );

  const updateTaskStatus = async (task: FollowUpTask, status: "completed" | "sent" | "skipped") => {
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
      setError("Unable to update task status.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Follow-ups</h1>
          <p className="text-sm text-muted-foreground">Track due and upcoming follow-up tasks</p>
        </div>
        <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">Loading follow-up tasks…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Follow-ups</h1>
            <p className="text-sm text-muted-foreground">Track due and upcoming follow-up tasks</p>
          </div>
          <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {enrichedTasks.length} total task{enrichedTasks.length !== 1 ? "s" : ""}
          </div>
        </div>
        {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <TaskGroupSection
          title="Overdue"
          tasks={groupedTasks.overdue}
          emptyText="No overdue follow-up tasks."
          onSend={(task) => updateTaskStatus(task, "sent")}
          onComplete={(task) => updateTaskStatus(task, "completed")}
          onSkip={(task) => updateTaskStatus(task, "skipped")}
        />
        <TaskGroupSection
          title="Due Today"
          tasks={groupedTasks.due}
          emptyText="No follow-ups due today."
          onSend={(task) => updateTaskStatus(task, "sent")}
          onComplete={(task) => updateTaskStatus(task, "completed")}
          onSkip={(task) => updateTaskStatus(task, "skipped")}
        />
        <TaskGroupSection
          title="Upcoming"
          tasks={groupedTasks.upcoming}
          emptyText="No upcoming follow-up tasks."
          onSend={(task) => updateTaskStatus(task, "sent")}
          onComplete={(task) => updateTaskStatus(task, "completed")}
          onSkip={(task) => updateTaskStatus(task, "skipped")}
        />
      </div>
    </div>
  );
}
