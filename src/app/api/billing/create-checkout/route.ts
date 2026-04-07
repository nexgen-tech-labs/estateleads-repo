/**
 * POST /api/billing/create-checkout
 * Creates a Stripe Checkout session for the given plan.
 */

import { createCheckoutSession } from "@/lib/stripe"
import { BillingPlan } from "@/types/billing"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, agencyId, email } = body as {
      plan: BillingPlan
      agencyId: string
      email: string
    }

    if (!plan || !agencyId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const url = await createCheckoutSession(plan, agencyId, email)
    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error("Checkout session error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
