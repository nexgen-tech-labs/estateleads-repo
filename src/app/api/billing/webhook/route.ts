/**
 * POST /api/billing/webhook
 * Stripe webhook handler — verifies signature and processes subscription events.
 */

import { getStripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const sig = request.headers.get("stripe-signature") ?? ""
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? ""

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  console.log(`Stripe webhook received: ${event.type}`)

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const { agencyId, plan } = session.metadata ?? {}
      // TODO: persist billing record to Firestore
      console.log(`Checkout completed — agency: ${agencyId}, plan: ${plan}`)
      break
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      console.log(`Subscription ${event.type}: ${sub.id}, status: ${sub.status}`)
      // TODO: update billing status in Firestore
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice
      console.log(`Payment failed for invoice: ${invoice.id}`)
      break
    }

    default:
      break
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
