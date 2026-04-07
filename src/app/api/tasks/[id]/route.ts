/**
 * PATCH /api/tasks/:id
 */

import { NextRequest, NextResponse } from "next/server";
import { updateTaskStatus, getTaskById } from "@/lib/task-utils";
import type { TaskStatus } from "@/types/task";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const task = getTaskById(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const body = await request.json();
    const { status } = body as { status?: TaskStatus };
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updated = updateTaskStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Unable to update task" }, { status: 500 });
    }

    return NextResponse.json({ task: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
