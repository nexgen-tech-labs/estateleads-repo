import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Free Trial",
    price: "£0",
    period: "14 days",
    description: "Try EstateLeads AI risk-free",
    features: [
      "25 AI-generated replies",
      "1 connected inbox",
      "Up to 50 leads",
      "Manual send only",
      "Email support",
    ],
    cta: "Start Free Trial",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "£29",
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
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "£79",
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
    cta: "Start Pro Trial",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "£149",
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
    cta: "Contact Sales",
    href: "/signup",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            EL
            </div>
            <span className="text-base font-semibold tracking-tight">EstateLeads AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="text-sm">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-8 text-center md:pt-20">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-muted-foreground">
          Start free, upgrade when you&apos;re ready. Cancel anytime.
        </p>
      </section>

      {/* Plans Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col border shadow-none ${
                plan.highlighted
                  ? "border-primary ring-1 ring-primary"
                  : "border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Most Popular
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
                    <li key={feature} className="flex items-start gap-2 text-base">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="mt-6">
                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className="w-full text-sm"
                    size="sm"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
          <span className="text-xs text-muted-foreground">
            © 2026 EstateLeads AI. All rights reserved.
          </span>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
