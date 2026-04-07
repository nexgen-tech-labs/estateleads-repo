"use client"

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FollowupStatusBadge } from "./followup-status-badge";
import { TaskActions } from "./task-actions";
import { FollowUpTask } from "@/types/task";
import { formatTaskDueDate } from "@/lib/task-utils";

interface FollowupTaskCardProps {
  task: FollowUpTask;
  leadName: string;
  propertyAddress: string;
  onSend: (task: FollowUpTask) => void;
  onComplete: (task: FollowUpTask) => void;
  onSkip: (task: FollowUpTask) => void;
}

export function FollowupTaskCard({
  task,
  leadName,
  propertyAddress,
  onSend,
  onComplete,
  onSkip,
}: FollowupTaskCardProps) {
  return (
    <Card className="border border-border shadow-none">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-sm font-semibold">{task.title}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {leadName} • {propertyAddress}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FollowupStatusBadge status={task.status} />
            <span className="text-xs text-muted-foreground">Due {formatTaskDueDate(task.dueAt)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">{task.subject}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{task.message}</p>
        </div>
        <TaskActions task={task} onSend={onSend} onComplete={onComplete} onSkip={onSkip} />
        <Link href={`/dashboard/leads/${task.leadId}`} className="text-sm text-primary hover:underline">
          View lead details
        </Link>
      </CardContent>
    </Card>
  );
}
