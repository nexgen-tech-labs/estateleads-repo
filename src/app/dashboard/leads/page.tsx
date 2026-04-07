"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { getLeads } from "@/lib/firestore/leads";
import { Button } from "@/components/ui/button";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadFilters } from "@/components/leads/lead-filters";
import { Plus, Upload } from "lucide-react";
import type { Lead, LeadStatus, LeadSource } from "@/types/lead";

export default function LeadsPage() {
  const { profile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "all">("all");

  useEffect(() => {
    if (!profile?.agencyId) return;
    getLeads(profile.agencyId).then(setLeads);
  }, [profile?.agencyId]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.propertyAddress.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, search, statusFilter, sourceFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your property enquiries
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/import">
            <Button variant="outline" size="sm" className="h-9 text-sm gap-1.5">
              <Upload className="h-4 w-4" />
              Import CSV
            </Button>
          </Link>
          <Link href="/dashboard/import">
            <Button size="sm" className="h-9 text-sm gap-1.5">
              <Plus className="h-4 w-4" />
              Add Lead
            </Button>
          </Link>
        </div>
      </div>

      <LeadFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sourceFilter={sourceFilter}
        onSourceFilterChange={setSourceFilter}
      />

      <div className="text-xs text-muted-foreground">
        {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
      </div>

      <LeadsTable leads={filteredLeads} />
    </div>
  );
}
