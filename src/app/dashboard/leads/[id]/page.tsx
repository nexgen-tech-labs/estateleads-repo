"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { getLeadById, updateLead } from "@/lib/firestore/leads";
import { getActivities, getNotes } from "@/lib/firestore/sub-collections";
import { Button } from "@/components/ui/button";
import { LeadProfileCard } from "@/components/leads/lead-profile-card";
import { EnquiryCard } from "@/components/leads/enquiry-card";
import { AiSummaryCard } from "@/components/leads/ai-summary-card";
import { AiReplyEditor } from "@/components/leads/ai-reply-editor";
import { FollowupSequence } from "@/components/leads/followup-sequence";
import { NotesCard } from "@/components/leads/notes-card";
import { ActivityTimeline } from "@/components/leads/activity-timeline";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { track } from "@/lib/analytics";
import type { Lead, ActivityItem, NoteItem } from "@/types/lead";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { profile } = useAuth();
  const [lead, setLead] = useState<Lead | null | undefined>(undefined);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    if (!profile?.agencyId) return;
    getLeadById(profile.agencyId, id).then(setLead);
    getActivities(profile.agencyId, id).then(setActivities);
    getNotes(profile.agencyId, id).then(setNotes);
  }, [profile?.agencyId, id]);

  // Still loading
  if (lead === undefined) return null;
  // Not found
  if (lead === null) notFound();

  const alreadyContacted = lead.status !== "new";

  async function handleMarkContacted() {
    if (!profile?.agencyId || !lead) return;
    setMarking(true);
    try {
      await updateLead(profile.agencyId, lead.id, {
        status: "contacted",
        lastContactedAt: new Date().toISOString(),
      });
      setLead({ ...lead, status: "contacted" });
      track("lead_contacted", { leadId: lead.id });
    } finally {
      setMarking(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/leads">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{lead.name}</h1>
            <p className="text-sm text-muted-foreground">{lead.propertyAddress}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={handleMarkContacted}
            disabled={alreadyContacted || marking}
          >
            {marking ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle className="h-3.5 w-3.5" />
            )}
            {alreadyContacted ? "Contacted" : "Mark Contacted"}
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-1">
          <LeadProfileCard lead={lead} />
          <EnquiryCard lead={lead} />
        </div>
        <div className="space-y-5 lg:col-span-2">
          <AiSummaryCard lead={lead} />
          <AiReplyEditor lead={lead} />
          <FollowupSequence lead={lead} />
          <NotesCard notes={notes} />
          <ActivityTimeline activities={activities} />
        </div>
      </div>
    </div>
  );
}
