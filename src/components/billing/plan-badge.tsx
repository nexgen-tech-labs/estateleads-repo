"use client"

import { Badge } from "@/components/ui/badge"
import { BillingPlan, BillingStatus } from "@/types/billing"
import { cn } from "@/lib/utils"

interface PlanBadgeProps {
  plan: BillingPlan
  status?: BillingStatus
  className?: string
}

const planLabels: Record<BillingPlan, string> = {
  trial: "Free Trial",
  starter: "Starter",
  pro: "Pro",
  agency: "Agency",
}

export function PlanBadge({ plan, status, className }: PlanBadgeProps) {
  const isPastDue = status === "past_due"
  const isCanceled = status === "canceled"

  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-medium",
        plan === "pro" && "bg-violet-100 text-violet-700",
        plan === "agency" && "bg-amber-100 text-amber-700",
        plan === "starter" && "bg-blue-100 text-blue-700",
        plan === "trial" && "bg-secondary text-muted-foreground",
        isPastDue && "bg-destructive/10 text-destructive",
        isCanceled && "bg-muted text-muted-foreground line-through",
        className
      )}
    >
      {planLabels[plan]}
    </Badge>
  )
}
