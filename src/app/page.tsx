import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Clock,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Mail,
  BarChart3,
  Users,
} from "lucide-react";

export default function LandingPage() {
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
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
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

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-16 text-center md:pt-28 md:pb-20">
        <div className="mb-4 inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">
          <Zap className="mr-1.5 h-3 w-3" />
          AI-powered follow-up for estate agencies
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Never lose a property enquiry again
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
          AI drafts replies, schedules follow-ups, and helps estate agencies move leads
          from inbox to viewing faster.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          14-day free trial · No credit card required
        </p>
      </section>

      {/* Problem Section */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Property enquiries are slipping through the cracks
            </h2>
            <p className="mt-3 text-muted-foreground">
              Most agencies lose leads not because they lack a CRM — but because
              follow-ups are slow, inconsistent, or forgotten entirely.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                stat: "78%",
                label: "of enquiries go to the first agent who responds",
              },
              {
                stat: "5 min",
                label: "is the window to reply before leads go cold",
              },
              {
                stat: "£10K+",
                label: "lost per missed deal in average commission",
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <p className="text-3xl font-bold tracking-tight">{item.stat}</p>
                <p className="mt-1.5 text-base text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            How EstateLeads AI works
          </h2>
          <p className="mt-3 text-muted-foreground">
            From inbox to viewing in three simple steps.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Enquiry arrives",
              desc: "Property enquiries land in your connected inbox or are imported via CSV. EstateLeads captures every lead automatically.",
              icon: Mail,
            },
            {
              step: "2",
              title: "AI drafts a reply",
              desc: "In seconds, AI generates a professional, personalised response. Review, edit if needed, and send with one click.",
              icon: Zap,
            },
            {
              step: "3",
              title: "Follow-ups on autopilot",
              desc: "If the lead doesn't respond, EstateLeads schedules follow-ups at day 1, 3, and 7 — so no lead goes cold.",
              icon: Clock,
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-semibold">
                {item.step}
              </div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-base text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Everything agents need, nothing they don&apos;t
            </h2>
            <p className="mt-3 text-muted-foreground">
              No bloated CRM. Just the workflow estate agencies actually need.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Instant AI Drafts",
                desc: "Reply to property enquiries in minutes, not hours. AI writes professional, warm responses for you.",
              },
              {
                icon: Clock,
                title: "Follow-up Automation",
                desc: "Never miss a follow-up. Scheduled sequences keep warm leads engaged over days and weeks.",
              },
              {
                icon: LayoutDashboard,
                title: "Simple Lead Workspace",
                desc: "See all your leads, statuses, and due tasks in one clean dashboard. No learning curve.",
              },
              {
                icon: Mail,
                title: "Gmail Integration",
                desc: "Connect your inbox and let EstateLeads capture enquiries directly from your email.",
              },
              {
                icon: BarChart3,
                title: "Lead Status Tracking",
                desc: "From new enquiry to viewing booked — track every lead's journey at a glance.",
              },
              {
                icon: Users,
                title: "Team Ready",
                desc: "Assign leads to agents, track who's handling what, and keep your team aligned.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <feature.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-3 text-base font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-base text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ready to stop losing leads?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start your free trial today. No credit card required.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-4">
            {["14-day free trial", "25 AI replies included", "No credit card needed"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            EL
            </div>
            <span className="text-xs text-muted-foreground">
              © 2026 EstateLeads AI. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="hover:text-foreground transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
