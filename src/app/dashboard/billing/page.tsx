"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { BillingSummaryCard } from "@/components/billing/billing-summary-card"
import { PricingCard } from "@/components/billing/pricing-card"
import { BillingRecord, BillingPlan, PLANS } from "@/types/billing"
import { useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

// Demo billing record — in production this would be fetched from Firestore
const demoBilling: BillingRecord = {
  agencyId: "agency_001",
  plan: "trial",
  status: "trialing",
  trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
}

export default function BillingPage() {
  const { profile } = useAuth()
  const searchParams = useSearchParams()
  const [upgrading, setUpgrading] = useState(false)

  const successParam = searchParams.get("success")
  const canceledParam = searchParams.get("canceled")

  const handleUpgrade = async (plan: BillingPlan) => {
    if (!profile?.agencyId || !profile?.email) return
    setUpgrading(true)
    try {
      const res = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, agencyId: profile.agencyId, email: profile.email }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error ?? "Failed to start checkout")
      }
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setUpgrading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payments
        </p>
      </div>

      {successParam === "true" && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Payment successful — your plan has been upgraded.
        </div>
      )}

      {canceledParam === "true" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Checkout was canceled. You have not been charged.
        </div>
      )}

      {/* Current plan summary */}
      <div className="max-w-sm">
        <BillingSummaryCard billing={demoBilling} />
      </div>

      {/* Upgrade options */}
      <div>
        <h2 className="mb-4 text-sm font-semibold tracking-tight">Available Plans</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currentPlan={demoBilling.plan}
              onUpgrade={handleUpgrade}
              loading={upgrading}
            />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground">
        All plans billed monthly. Cancel anytime. Stripe handles all payments securely.
      </p>
    </div>
  )
}
