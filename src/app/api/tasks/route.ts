/**
 * GET /api/tasks
 * POST /api/tasks
 */

import { NextRequest, NextResponse } from "next/server";
import { createTasks, getTasks } from "@/lib/task-utils";
import type { FollowUpTask } from "@/types/task";

interface CreateTasksRequest {
  tasks: Array<{
    leadId: string;
    agencyId: string;
    title: string;
    subject: string;
    message: string;
    dueAt: string;
    status: "due" | "completed" | "skipped" | "sent";
    sequenceStep: 1 | 2 | 3;
    assignedTo?: string;
  }>;
}

export async function GET() {
  const tasks = getTasks();
  return NextResponse.json({ tasks }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateTasksRequest;
    if (!body.tasks || !Array.isArray(body.tasks)) {
      return NextResponse.json({ error: "Tasks are required" }, { status: 400 });
    }

    const createdTasks = createTasks(body.tasks);
    return NextResponse.json({ tasks: createdTasks }, { status: 201 });
  } catch (error) {
    console.error("Error creating tasks:", error);
    return NextResponse.json({ error: "Failed to create tasks" }, { status: 500 });
  }
}
