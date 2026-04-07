import { Badge } from "@/components/ui/badge";
import { LeadStatus, LEAD_STATUS_LABELS } from "@/types/lead";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  awaiting_reply: "bg-amber-50 text-amber-700 border-amber-200",
  viewing_requested: "bg-violet-50 text-violet-700 border-violet-200",
  viewing_booked: "bg-indigo-50 text-indigo-700 border-indigo-200",
  warm: "bg-orange-50 text-orange-700 border-orange-200",
  cold: "bg-slate-50 text-slate-600 border-slate-200",
  closed_won: "bg-green-50 text-green-700 border-green-200",
  closed_lost: "bg-red-50 text-red-700 border-red-200",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${statusStyles[status]}`}
    >
      {LEAD_STATUS_LABELS[status]}
    </Badge>
  );
}
