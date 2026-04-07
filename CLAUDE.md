@AGENTS.md

# EstateLeads AI — Codebase Guide

## Project Overview

EstateLeads AI is a UK estate agency SaaS for managing property enquiry leads with AI-powered email drafting and automated follow-up sequences. The core value prop: agents miss deals because enquiries go cold — this tool auto-drafts replies and schedules follow-ups.

**Stack:** Next.js 16.2.2 · React 19.2.4 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui · OpenAI API

---

## Critical: Next.js 16 Breaking Changes

This project runs **Next.js 16**, not v14/v15. Key breaking changes from prior versions:

1. **Async Request APIs are mandatory** — `cookies()`, `headers()`, `draftMode()`, and `params` in layouts/pages/routes must be `await`ed. Synchronous access was removed in v16.
   ```ts
   // WRONG (v14 style):
   const { id } = params
   // CORRECT:
   const { id } = await params
   ```

2. **`middleware.ts` is deprecated** — renamed to `proxy.ts`, export renamed from `middleware` to `proxy`. Edge runtime is NOT supported in proxy.

3. **`'use cache'` directive** — new caching primitive replaces `fetch` cache options. Read `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md` before adding data fetching.

4. **Tailwind CSS 4** — uses `@tailwindcss/postcss` plugin, no `tailwind.config.js`. CSS-first configuration in `globals.css` using `@theme`. Do not create `tailwind.config.js`.

5. **Instant navigation** — if fixing slow client-side nav, `Suspense` alone is not enough. Export `unstable_instant` from the route. See `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.

Before writing any Next.js code, check: `node_modules/next/dist/docs/`

---

## Dev Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

---

## Environment Variables

Required in `.env.local`:
```
OPENAI_API_KEY=sk-...          # Required
OPENAI_MODEL=gpt-4o-mini       # Optional, defaults to gpt-4o-mini
```

See `.env.local.example` for template.

---

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── api/ai/                 # AI API routes (server-side OpenAI calls)
│   │   ├── summarize-lead/route.ts
│   │   ├── generate-reply/route.ts
│   │   └── generate-followups/route.ts
│   ├── dashboard/              # Protected dashboard pages
│   │   ├── layout.tsx          # Dashboard shell (sidebar + header)
│   │   ├── page.tsx            # Overview: stats, recent leads
│   │   ├── leads/page.tsx      # Lead list with filters
│   │   ├── leads/[id]/page.tsx # Lead detail (AI features live here)
│   │   ├── followups/page.tsx
│   │   ├── import/page.tsx     # CSV + manual import
│   │   ├── inbox/page.tsx
│   │   ├── templates/page.tsx
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── pricing/page.tsx
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout (Libre Franklin font)
│   └── globals.css             # Tailwind + OKLCH theme variables
├── components/
│   ├── layout/                 # header.tsx, sidebar.tsx
│   ├── dashboard/              # stats-cards, recent-leads-table, quick-actions
│   ├── leads/                  # Lead-specific components (see below)
│   └── ui/                     # shadcn/ui primitives (do not edit)
├── lib/
│   ├── ai.ts                   # callLLM(), parseJsonResponse()
│   ├── prompts.ts              # Prompt templates (UK estate agency context)
│   ├── mock-data.ts            # All mock data + helper fns
│   └── utils.ts                # cn() classname util
└── types/
    ├── lead.ts                 # Lead, LeadStatus, LeadSource, etc.
    └── ai.ts                   # AI request/response types
```

---

## Data Layer (Mock-Only)

There is no database. All data lives in `src/lib/mock-data.ts`:
- `mockLeads` — 10 sample leads
- `mockActivities`, `mockNotes`, `mockFollowUps`
- `dashboardStats`
- Helpers: `getLeadById()`, `getActivitiesForLead()`, `getNotesForLead()`, `getFollowUpsForLead()`, `getAssignedUser()`

When adding features, read from these helpers. When wiring up a real database, replace these helpers.

---

## Authentication

**Not implemented.** Login/signup pages exist with placeholder form handlers that redirect to `/dashboard`. Google OAuth buttons are UI-only. Firebase is mentioned in comments but not wired up.

Do not add server-side auth guards without implementing the auth layer first.

---

## AI Integration

All AI calls go server-side through API routes. **Never call OpenAI directly from client components.**

**`src/lib/ai.ts`:**
```ts
callLLM(prompt: string): Promise<string>   // calls OpenAI chat completions
parseJsonResponse<T>(raw: string): T       // strips markdown fences + JSON.parse
```

**API Routes (all POST):**
| Route | Required body fields | Returns |
|-------|---------------------|---------|
| `/api/ai/summarize-lead` | `leadName`, `property`, `message` | `LeadSummaryResponse` |
| `/api/ai/generate-reply` | `leadName`, `property`, `message` | `ReplyResponse` |
| `/api/ai/generate-followups` | `leadName`, `property`, `message` | `FollowupResponse` |

All routes accept optional `agencyName` (defaults to `"Harbour Homes"`).

**Prompts are in `src/lib/prompts.ts`** — UK estate agency context, replies under 140 words, warm tone.

---

## Key Types

```ts
// src/types/lead.ts
LeadStatus: "new" | "contacted" | "awaiting_reply" | "viewing_requested" |
            "viewing_booked" | "warm" | "cold" | "closed_won" | "closed_lost"
LeadSource: "gmail" | "csv" | "manual" | "website" | "rightmove" | "zoopla" | "portal" | "phone"
LeadTemperature: "hot" | "warm" | "cold"
LeadType: "buyer" | "seller" | "renter" | "landlord" | "investor"

// src/types/ai.ts
LeadSummaryResponse: { summary, leadType, timeline, nextAction, temperature }
ReplyResponse: { subject, body }
FollowupResponse: { step1, step2, step3 }  // day 1, 3, 7 sequences
```

---

## UI Conventions

- **shadcn/ui** components in `src/components/ui/` — do not edit directly
- **Style:** `base-nova` style, neutral color palette, CSS variables
- **Colors:** OKLCH color space in `globals.css` — use semantic tokens (`primary`, `secondary`, `accent`, `muted`, `destructive`)
- **Classnames:** Always use `cn()` from `src/lib/utils.ts` for conditional classes
- **Icons:** `lucide-react` only
- **Font:** Libre Franklin (loaded via `next/font/google` in root layout)
- **Dark mode:** `.dark` class-based, variables defined in `globals.css`

---

## Leads Component Reference

Key components in `src/components/leads/`:
| File | Purpose |
|------|---------|
| `ai-summary-card.tsx` | Calls `/api/ai/summarize-lead`, shows temperature/timeline/next action |
| `ai-reply-editor.tsx` | Calls `/api/ai/generate-reply`, copy-to-clipboard |
| `followup-sequence.tsx` | Renders 3-step follow-up schedule |
| `activity-timeline.tsx` | Activity log |
| `lead-profile-card.tsx` | Contact info + status |
| `enquiry-card.tsx` | Original enquiry message |
| `notes-card.tsx` | Agent notes |
| `lead-filters.tsx` | Filter UI for leads list |
| `leads-table.tsx` | Paginated leads table |
| `csv-upload-zone.tsx` | Drag-and-drop CSV import |
| `import-form.tsx` | Manual lead entry form |

---

## Path Aliases

`@/*` → `src/*` (configured in `tsconfig.json`)

```ts
import { cn } from "@/lib/utils"
import type { Lead } from "@/types/lead"
```

---

## What Needs Building

The app is UI-complete but backend-hollow. Missing:
1. **Database** — replace `mock-data.ts` with real persistence (Prisma/Drizzle recommended)
2. **Authentication** — wire up Firebase Auth or NextAuth
3. **Email sending** — inbox/templates pages are shells
4. **Pricing/billing** — pricing page is a placeholder
5. **Real lead imports** — CSV parsing and Gmail OAuth not implemented
