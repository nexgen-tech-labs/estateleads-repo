import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lead } from "@/types/lead";

interface RecentLeadsTableProps {
  leads: Lead[];
}

function statusVariant(status: string) {
  switch (status) {
    case "new":
      return "default";
    case "contacted":
      return "secondary";
    case "awaiting_reply":
      return "outline";
    case "viewing_requested":
    case "viewing_booked":
      return "default";
    case "warm":
      return "secondary";
    case "cold":
      return "outline";
    default:
      return "outline";
  }
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Recent Leads</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-sm">Name</TableHead>
              <TableHead className="text-sm">Property</TableHead>
              <TableHead className="text-sm">Source</TableHead>
              <TableHead className="text-sm">Status</TableHead>
              <TableHead className="text-sm text-right">Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="cursor-pointer">
                <TableCell className="py-3">
                  <div>
                    <p className="text-base font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-base text-muted-foreground">
                  {lead.propertyAddress}
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-sm text-muted-foreground capitalize">
                    {lead.source}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <Badge variant={statusVariant(lead.status)} className="text-xs font-medium">
                    {formatStatus(lead.status)}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-right text-sm text-muted-foreground">
                  {timeAgo(lead.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
