type AnalyticsEvent =
  | "lead_created"
  | "lead_contacted"
  | "ai_summary_generated"
  | "ai_reply_generated"
  | "followups_generated"
  | "task_completed"
  | "email_imported"
  | "demo_viewed"

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  console.log(`[analytics] ${event}`, props ?? "")
  // future: posthog.capture(event, props)
}
