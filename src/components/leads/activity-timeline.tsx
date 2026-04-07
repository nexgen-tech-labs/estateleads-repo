import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityItem } from "@/types/lead";
import {
  Activity,
  Mail,
  MailOpen,
  Clock,
  PlusCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

const typeIcons: Record<ActivityItem["type"], React.ElementType> = {
  lead_created: PlusCircle,
  status_change: ArrowRight,
  email_sent: Mail,
  email_received: MailOpen,
  follow_up_scheduled: Clock,
  note_added: Activity,
  ai_reply_generated: Sparkles,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const sorted = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card className="border border-border shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Activity className="h-4 w-4 text-muted-foreground" />
          Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No activity yet</p>
        ) : (
          <div className="relative space-y-0">
            {sorted.map((item, idx) => {
              const Icon = typeIcons[item.type] ?? Activity;
              const isLast = idx === sorted.length - 1;
              return (
                <div key={item.id} className="relative flex gap-3 pb-4">
                  {!isLast && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                  )}
                  <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
