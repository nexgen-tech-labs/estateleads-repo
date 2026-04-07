export type TaskStatus = "due" | "completed" | "skipped" | "sent";

export type TaskGroup = "due" | "overdue" | "upcoming";

export interface FollowUpTask {
  id: string;
  leadId: string;
  agencyId: string;
  title: string;
  subject: string;
  message: string;
  dueAt: string;
  status: TaskStatus;
  sequenceStep: 1 | 2 | 3;
  assignedTo?: string;
  createdAt: string;
  completedAt?: string;
}
