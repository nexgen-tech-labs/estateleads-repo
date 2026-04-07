"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { getLeads, getDashboardStats } from "@/lib/firestore/leads";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentLeadsTable } from "@/components/dashboard/recent-leads-table";
import { QuickActions } from "@/components/dashboard/quick-actions";
import type { Lead } from "@/types/lead";

export default function DashboardPage() {
  const { profile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    newLeadsToday: 0,
    followUpsDue: 0,
    repliesSentToday: 0,
    warmLeads: 0,
  });

  useEffect(() => {
    if (!profile?.agencyId) return;
    getLeads(profile.agencyId).then((data) => {
      setLeads(data);
    });
    getDashboardStats(profile.agencyId).then(setStats);
  }, [profile?.agencyId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-base text-muted-foreground">
            Welcome back, {profile?.agencyName ?? "…"}
          </p>
        </div>
        <QuickActions />
      </div>

      <StatsCards stats={stats} />

      <RecentLeadsTable leads={leads.slice(0, 5)} />
    </div>
  );
}
