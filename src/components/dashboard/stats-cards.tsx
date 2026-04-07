import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Send, Flame } from "lucide-react";

interface StatsCardsProps {
  stats: {
    newLeadsToday: number;
    followUpsDue: number;
    repliesSentToday: number;
    warmLeads: number;
  };
}

const cards = [
  {
    key: "newLeadsToday" as const,
    label: "New Leads Today",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    key: "followUpsDue" as const,
    label: "Follow-ups Due",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    key: "repliesSentToday" as const,
    label: "Replies Sent Today",
    icon: Send,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    key: "warmLeads" as const,
    label: "Warm Leads",
    icon: Flame,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.key} className="border border-border shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight">
                  {stats[card.key]}
                </p>
              </div>
              <div className={`rounded-lg p-2.5 ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
