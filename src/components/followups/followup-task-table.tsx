"use client"

import Link from "next/link";
import { FollowUpTask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { FollowupStatusBadge } from "./followup-status-badge";
import { formatTaskDueDate } from "@/lib/task-utils";

interface FollowupTaskTableProps {
  tasks: Array<FollowUpTask & { leadName: string; propertyAddress: string }>;
  onSend: (task: FollowUpTask) => void;
  onComplete: (task: FollowUpTask) => void;
  onSkip: (task: FollowUpTask) => void;
}

export function FollowupTaskTable({ tasks, onSend, onComplete, onSkip }: FollowupTaskTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="min-w-full divide-y divide-border text-left text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-[0.08em] text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Lead</th>
            <th className="px-4 py-3">Step</th>
            <th className="px-4 py-3">Due</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-muted/70">
              <td className="px-4 py-3">
                <div className="font-medium">{task.leadName}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[220px]">{task.propertyAddress}</div>
              </td>
              <td className="px-4 py-3">Day {task.sequenceStep}</td>
              <td className="px-4 py-3">{formatTaskDueDate(task.dueAt)}</td>
              <td className="px-4 py-3">
                <FollowupStatusBadge status={task.status} />
              </td>
              <td className="px-4 py-3 space-x-2">
                <Button size="sm" variant="outline" onClick={() => onSend(task)} disabled={task.status !== "due"}>
                  Send Now
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onComplete(task)} disabled={task.status === "completed"}>
                  Complete
                </Button>
                <Link href={`/dashboard/leads/${task.leadId}`} className="text-xs font-medium text-primary hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
