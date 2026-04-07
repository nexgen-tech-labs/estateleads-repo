import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/lead";
import { Home, MessageSquare } from "lucide-react";

interface EnquiryCardProps {
  lead: Lead;
}

export function EnquiryCard({ lead }: EnquiryCardProps) {
  return (
    <div className="space-y-4">
      {/* Property Interest */}
      <Card className="border border-border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Home className="h-4 w-4 text-muted-foreground" />
            Property Interest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">{lead.propertyAddress}</p>
          {lead.propertyReference && (
            <p className="mt-1 text-xs text-muted-foreground">
              Ref: {lead.propertyReference}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Original Enquiry */}
      <Card className="border border-border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            Original Enquiry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-sm leading-relaxed">{lead.message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
