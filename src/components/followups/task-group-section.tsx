"use client"

import { FollowUpTask } from "@/types/task";
import { FollowupTaskTable } from "./followup-task-table";

interface TaskGroupSectionProps {
  title: string;
  tasks: Array<FollowUpTask & { leadName: string; propertyAddress: string }>;
  emptyText: string;
  onSend: (task: FollowUpTask) => void;
  onComplete: (task: FollowUpTask) => void;
  onSkip: (task: FollowUpTask) => void;
}

export function TaskGroupSection({
  title,
  tasks,
  emptyText,
  onSend,
  onComplete,
  onSkip,
}: TaskGroupSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{tasks.length} task{tasks.length !== 1 ? "s" : ""}</p>
      </div>
      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          {emptyText}
        </div>
      ) : (
        <FollowupTaskTable tasks={tasks} onSend={onSend} onComplete={onComplete} onSkip={onSkip} />
      )}
    </section>
  );
}
