import { FollowUpTask, TaskGroup, TaskStatus } from "@/types/task";
import type { Lead } from "@/types/lead";

const taskStore: FollowUpTask[] = [
  {
    id: "task_001",
    leadId: "lead_002",
    agencyId: "agency_001",
    title: "Follow-up Day 1",
    subject: "Checking in on your property search",
    message: "Hi James, just following up to see if you’re still interested in the property at 45 Kings Terrace. We can arrange a viewing at your convenience.",
    dueAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "due",
    sequenceStep: 1,
    assignedTo: "user_002",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task_002",
    leadId: "lead_005",
    agencyId: "agency_001",
    title: "Follow-up Day 1",
    subject: "Quick check-in on move-in timing",
    message: "Hi Michael, just checking whether you’ve had a chance to review the 2-bed flat on Albert Road. I can share available move-in dates if that helps.",
    dueAt: new Date().toISOString(),
    status: "due",
    sequenceStep: 1,
    assignedTo: "user_002",
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task_003",
    leadId: "lead_006",
    agencyId: "agency_001",
    title: "Follow-up Day 3",
    subject: "Follow-up on the Winchester property",
    message: "Hi Fiona, I wanted to follow up on the Chapel Lane property and answer any questions you may have about the area or school catchment.",
    dueAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "due",
    sequenceStep: 2,
    assignedTo: "user_001",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task_004",
    leadId: "lead_010",
    agencyId: "agency_001",
    title: "Follow-up Day 1",
    subject: "Landlord management follow-up",
    message: "Hi Karen, just checking whether you’d like to go ahead with a management proposal for your waterfront flat.",
    dueAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "due",
    sequenceStep: 1,
    assignedTo: "user_003",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

export function buildFollowupTasksFromLead(
  lead: Lead,
  followups: { step1: string; step2: string; step3: string }
): Omit<FollowUpTask, "id" | "createdAt" | "completedAt">[] {
  const baseDue = Date.now();
  const dueOffsets = [1, 3, 7];
  const followupKeys: Array<keyof typeof followups> = ["step1", "step2", "step3"];

  return followupKeys.map((key, index) => ({
    leadId: lead.id,
    agencyId: lead.agencyId,
    title: `Follow-up Day ${dueOffsets[index]}`,
    subject: `Follow-up for ${lead.propertyAddress}`,
    message: followups[key],
    dueAt: new Date(baseDue + dueOffsets[index] * 24 * 60 * 60 * 1000).toISOString(),
    status: "due",
    sequenceStep: index + 1 as 1 | 2 | 3,
    assignedTo: lead.assignedTo || "user_001",
  }));
}

export function getTasks(): FollowUpTask[] {
  return [...taskStore];
}

export function getTaskById(id: string): FollowUpTask | undefined {
  return taskStore.find((task) => task.id === id);
}

export function getTasksForLead(leadId: string): FollowUpTask[] {
  return taskStore.filter((task) => task.leadId === leadId);
}

export function createTasks(tasks: Omit<FollowUpTask, "id" | "createdAt" | "completedAt">[]): FollowUpTask[] {
  const newTasks = tasks.map((task) => {
    const newTask: FollowUpTask = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    taskStore.push(newTask);
    return newTask;
  });
  return newTasks;
}

export function updateTaskStatus(id: string, status: TaskStatus): FollowUpTask | undefined {
  const task = getTaskById(id);
  if (!task) return undefined;

  task.status = status;
  task.completedAt = status === "completed" || status === "sent" ? new Date().toISOString() : undefined;
  return task;
}

export function getTaskGroup(task: FollowUpTask): TaskGroup {
  const now = new Date();
  const dueAt = new Date(task.dueAt);

  if (task.status !== "due") {
    return "upcoming";
  }

  const isSameDay =
    dueAt.getUTCFullYear() === now.getUTCFullYear() &&
    dueAt.getUTCMonth() === now.getUTCMonth() &&
    dueAt.getUTCDate() === now.getUTCDate();

  if (dueAt < now) {
    return "overdue";
  }

  if (isSameDay) {
    return "due";
  }

  return "upcoming";
}

export function formatTaskDueDate(dueAt: string): string {
  return new Date(dueAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
