"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lead } from "@/types/lead";
import { LeadStatusBadge } from "./lead-status-badge";

interface LeadsTableProps {
  leads: Lead[];
  agencyUsers?: Map<string, string>; // userId -> name
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatSource(source: string) {
  const map: Record<string, string> = {
    gmail: "Gmail",
    website: "Website",
    rightmove: "Rightmove",
    zoopla: "Zoopla",
    manual: "Manual",
    csv: "CSV",
    portal: "Portal",
    phone: "Phone",
  };
  return map[source] ?? source;
}

export function LeadsTable({ leads, agencyUsers }: LeadsTableProps) {
  const router = useRouter();

  if (leads.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border bg-card">
        <p className="text-sm text-muted-foreground">No leads match your filters</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-sm">Name</TableHead>
            <TableHead className="text-sm">Property</TableHead>
            <TableHead className="text-sm">Source</TableHead>
            <TableHead className="text-sm">Status</TableHead>
            <TableHead className="text-sm">Last Contacted</TableHead>
            <TableHead className="text-sm">Next Follow-up</TableHead>
            <TableHead className="text-sm">Assigned To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const assignedName = lead.assignedTo ? (agencyUsers?.get(lead.assignedTo) ?? "—") : "—";
            return (
              <TableRow
                key={lead.id}
                className="cursor-pointer"
                onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
              >
                <TableCell className="py-3">
                  <div>
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground max-w-[200px] truncate">
                  {lead.propertyAddress}
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">
                  {formatSource(lead.source)}
                </TableCell>
                <TableCell className="py-3">
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">
                  {formatDate(lead.lastContactedAt)}
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">
                  {formatDate(lead.nextFollowUpAt)}
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">
                  {assignedName}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
