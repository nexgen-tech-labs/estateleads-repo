import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead, LEAD_TYPE_LABELS, LEAD_SOURCE_LABELS } from "@/types/lead";
import { LeadStatusBadge } from "./lead-status-badge";
import { Mail, Phone, Tag, Globe, UserCheck, Calendar } from "lucide-react";

interface LeadProfileCardProps {
  lead: Lead;
  assignedUserName?: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-all">{value}</p>
      </div>
    </div>
  );
}

export function LeadProfileCard({ lead, assignedUserName }: LeadProfileCardProps) {

  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold">{lead.name}</CardTitle>
          <LeadStatusBadge status={lead.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-0 divide-y divide-border">
        <InfoRow icon={Mail} label="Email" value={lead.email} />
        {lead.phone && <InfoRow icon={Phone} label="Phone" value={lead.phone} />}
        <InfoRow icon={Tag} label="Lead Type" value={LEAD_TYPE_LABELS[lead.leadType]} />
        <InfoRow icon={Globe} label="Source" value={LEAD_SOURCE_LABELS[lead.source]} />
        {assignedUserName && <InfoRow icon={UserCheck} label="Assigned To" value={assignedUserName} />}
        <InfoRow icon={Calendar} label="Created" value={formatDate(lead.createdAt)} />
      </CardContent>
    </Card>
  );
}
