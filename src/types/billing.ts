export type BillingPlan = "trial" | "starter" | "pro" | "agency"

export type BillingStatus = "trialing" | "active" | "past_due" | "canceled" | "unpaid"

export interface BillingRecord {
  agencyId: string
  plan: BillingPlan
  status: BillingStatus
  trialEndsAt?: string        // ISO date
  renewalDate?: string        // ISO date
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

export interface PlanConfig {
  id: BillingPlan
  name: string
  price: string               // display e.g. "£29"
  priceMonthly: number        // numeric pence e.g. 2900
  period: string
  description: string
  features: string[]
  highlighted: boolean
  stripePriceId: string       // from env
  limits: {
    leads: number | null      // null = unlimited
    inboxes: number | null
    users: number | null
  }
}

export const PLANS: PlanConfig[] = [
  {
    id: "trial",
    name: "Free Trial",
    price: "£0",
    priceMonthly: 0,
    period: "14 days",
    description: "Try EstateLeads AI risk-free",
    features: [
      "25 AI-generated replies",
      "1 connected inbox",
      "Up to 50 leads",
      "Manual send only",
      "Email support",
    ],
    highlighted: false,
    stripePriceId: "",
    limits: { leads: 50, inboxes: 1, users: 1 },
  },
  {
    id: "starter",
    name: "Starter",
    price: "£29",
    priceMonthly: 2900,
    period: "/month",
    description: "For solo agents getting started",
    features: [
      "1 connected inbox",
      "250 leads per month",
      "AI draft replies",
      "Follow-up reminders",
      "CSV import",
      "Email support",
    ],
    highlighted: false,
    stripePriceId: process.env.STRIPE_PRICE_STARTER ?? "",
    limits: { leads: 250, inboxes: 1, users: 1 },
  },
  {
    id: "pro",
    name: "Pro",
    price: "£79",
    priceMonthly: 7900,
    period: "/month",
    description: "For growing agencies",
    features: [
      "3 connected inboxes",
      "1,500 leads per month",
      "AI follow-up sequences",
      "Auto task scheduling",
      "Team notes",
      "Priority support",
    ],
    highlighted: true,
    stripePriceId: process.env.STRIPE_PRICE_PRO ?? "",
    limits: { leads: 1500, inboxes: 3, users: 5 },
  },
  {
    id: "agency",
    name: "Agency",
    price: "£149",
    priceMonthly: 14900,
    period: "/month",
    description: "For multi-branch operations",
    features: [
      "Unlimited inboxes",
      "Unlimited leads",
      "Multi-user access",
      "Multiple branches",
      "Reporting & analytics",
      "Custom templates",
      "Dedicated support",
    ],
    highlighted: false,
    stripePriceId: process.env.STRIPE_PRICE_AGENCY ?? "",
    limits: { leads: null, inboxes: null, users: null },
  },
]
