import Stripe from "stripe"
import { BillingPlan, PLANS } from "@/types/billing"

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set")
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" })
}

export async function createCheckoutSession(
  plan: BillingPlan,
  agencyId: string,
  userEmail: string
): Promise<string> {
  const planConfig = PLANS.find((p) => p.id === plan)
  if (!planConfig || !planConfig.stripePriceId) {
    throw new Error(`No Stripe price configured for plan: ${plan}`)
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [{ price: planConfig.stripePriceId, quantity: 1 }],
    metadata: { agencyId, plan },
    success_url: `${baseUrl}/dashboard/billing?success=true`,
    cancel_url: `${baseUrl}/dashboard/billing?canceled=true`,
  })

  return session.url ?? ""
}
