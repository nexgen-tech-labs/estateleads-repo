"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Slash } from "lucide-react";
import { FollowUpTask, TaskStatus } from "@/types/task";

interface TaskActionsProps {
  task: FollowUpTask;
  onSend: (task: FollowUpTask) => void;
  onComplete: (task: FollowUpTask) => void;
  onSkip: (task: FollowUpTask) => void;
}

export function TaskActions({ task, onSend, onComplete, onSkip }: TaskActionsProps) {
  const isActionable = task.status === "due";

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onSend(task)}
        disabled={!isActionable}
        className="min-w-[96px]"
      >
        <ArrowRight className="h-3.5 w-3.5" />
        Send Now
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => onComplete(task)}
        disabled={task.status === "completed"}
        className="min-w-[96px]"
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        Mark Completed
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onSkip(task)}
        disabled={task.status === "skipped" || task.status === "completed"}
        className="min-w-[96px]"
      >
        <Slash className="h-3.5 w-3.5" />
        Skip
      </Button>
    </div>
  );
}
