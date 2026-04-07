"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BillingPlan, PlanConfig } from "@/types/billing"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  plan: PlanConfig
  currentPlan?: BillingPlan
  onUpgrade: (plan: BillingPlan) => void
  loading?: boolean
}

export function PricingCard({ plan, currentPlan, onUpgrade, loading }: PricingCardProps) {
  const isCurrent = plan.id === currentPlan
  const isDowngrade =
    currentPlan &&
    ["trial", "starter", "pro", "agency"].indexOf(plan.id) <
      ["trial", "starter", "pro", "agency"].indexOf(currentPlan)

  return (
    <Card
      className={cn(
        "relative flex flex-col border shadow-none transition-shadow",
        plan.highlighted && !isCurrent && "border-primary ring-1 ring-primary",
        isCurrent && "border-emerald-500 ring-1 ring-emerald-500"
      )}
    >
      {plan.highlighted && !isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-medium text-white">
          Current Plan
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium text-muted-foreground">
          {plan.name}
        </CardTitle>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        <ul className="flex-1 space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={isCurrent ? "outline" : plan.highlighted ? "default" : "outline"}
          size="sm"
          className="mt-6 w-full text-sm"
          disabled={isCurrent || isDowngrade || loading || plan.id === "trial"}
          onClick={() => onUpgrade(plan.id)}
        >
          {isCurrent
            ? "Current Plan"
            : isDowngrade
            ? "Downgrade"
            : plan.id === "trial"
            ? "Free Trial"
            : `Upgrade to ${plan.name}`}
        </Button>
      </CardContent>
    </Card>
  )
}
