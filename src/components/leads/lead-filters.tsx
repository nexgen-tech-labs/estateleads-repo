"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadStatus, LeadSource, LEAD_STATUS_LABELS, LEAD_SOURCE_LABELS } from "@/types/lead";

interface LeadFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: LeadStatus | "all";
  onStatusFilterChange: (value: LeadStatus | "all") => void;
  sourceFilter: LeadSource | "all";
  onSourceFilterChange: (value: LeadSource | "all") => void;
}

const statuses: (LeadStatus | "all")[] = [
  "all", "new", "contacted", "awaiting_reply", "viewing_requested",
  "viewing_booked", "warm", "cold", "closed_won", "closed_lost",
];

const sources: (LeadSource | "all")[] = [
  "all", "gmail", "website", "rightmove", "zoopla", "manual", "csv", "portal", "phone",
];

export function LeadFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sourceFilter,
  onSourceFilterChange,
}: LeadFiltersProps) {
  const hasFilters = search || statusFilter !== "all" || sourceFilter !== "all";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 pl-9 text-sm"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as LeadStatus | "all")}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
      >
        <option value="all">All statuses</option>
        {statuses.filter((s) => s !== "all").map((s) => (
          <option key={s} value={s}>{LEAD_STATUS_LABELS[s as LeadStatus]}</option>
        ))}
      </select>

      <select
        value={sourceFilter}
        onChange={(e) => onSourceFilterChange(e.target.value as LeadSource | "all")}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
      >
        <option value="all">All sources</option>
        {sources.filter((s) => s !== "all").map((s) => (
          <option key={s} value={s}>{LEAD_SOURCE_LABELS[s as LeadSource]}</option>
        ))}
      </select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1 text-sm text-muted-foreground"
          onClick={() => {
            onSearchChange("");
            onStatusFilterChange("all");
            onSourceFilterChange("all");
          }}
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}
