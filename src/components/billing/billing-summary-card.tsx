"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BillingRecord, BillingPlan } from "@/types/billing"
import { PlanBadge } from "./plan-badge"
import { CreditCard, CalendarDays, AlertCircle } from "lucide-react"

const planLabels: Record<BillingPlan, string> = {
  trial: "Free Trial",
  starter: "Starter — £29/month",
  pro: "Pro — £79/month",
  agency: "Agency — £149/month",
}

interface BillingSummaryCardProps {
  billing: BillingRecord
}

function formatDate(iso?: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function trialDaysLeft(trialEndsAt?: string): number | null {
  if (!trialEndsAt) return null
  const diff = new Date(trialEndsAt).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function BillingSummaryCard({ billing }: BillingSummaryCardProps) {
  const daysLeft = billing.plan === "trial" ? trialDaysLeft(billing.trialEndsAt) : null
  const isPastDue = billing.status === "past_due"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          Current Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{planLabels[billing.plan]}</p>
            <p className="mt-0.5 text-xs text-muted-foreground capitalize">
              {billing.status === "trialing" ? "Free trial" : billing.status}
            </p>
          </div>
          <PlanBadge plan={billing.plan} status={billing.status} />
        </div>

        {daysLeft !== null && (
          <div
            className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
              daysLeft <= 3
                ? "bg-destructive/10 text-destructive"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {daysLeft <= 3 ? (
              <AlertCircle className="h-4 w-4 shrink-0" />
            ) : (
              <CalendarDays className="h-4 w-4 shrink-0" />
            )}
            <span>
              {daysLeft === 0
                ? "Trial expired"
                : `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining on free trial`}
            </span>
          </div>
        )}

        {isPastDue && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Payment failed — please update your payment method.</span>
          </div>
        )}

        <Separator />

        <div className="space-y-2 text-sm">
          {billing.renewalDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next renewal</span>
              <span className="font-medium">{formatDate(billing.renewalDate)}</span>
            </div>
          )}
          {billing.trialEndsAt && billing.plan === "trial" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trial ends</span>
              <span className="font-medium">{formatDate(billing.trialEndsAt)}</span>
            </div>
          )}
        </div>

        {billing.stripeCustomerId && (
          <>
            <Separator />
            <Button variant="outline" size="sm" className="w-full text-sm" disabled>
              Manage Billing (Stripe Portal)
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
