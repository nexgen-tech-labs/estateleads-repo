"use client"

import { TaskStatus } from "@/types/task";

const badgeClasses: Record<TaskStatus, string> = {
  due: "bg-amber-100 text-amber-800",
  completed: "bg-emerald-100 text-emerald-800",
  skipped: "bg-slate-100 text-slate-800",
  sent: "bg-sky-100 text-sky-800",
};

const badgeLabels: Record<TaskStatus, string> = {
  due: "Due",
  completed: "Completed",
  skipped: "Skipped",
  sent: "Sent",
};

interface FollowupStatusBadgeProps {
  status: TaskStatus;
}

export function FollowupStatusBadge({ status }: FollowupStatusBadgeProps) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeClasses[status]}`}>
      {badgeLabels[status]}
    </span>
  );
}
