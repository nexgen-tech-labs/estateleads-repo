"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import type { LeadType, LeadSource, LeadStatus } from "@/types/lead";

const leadTypes: { value: LeadType; label: string }[] = [
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "renter", label: "Renter" },
  { value: "landlord", label: "Landlord" },
  { value: "investor", label: "Investor" },
];

const leadSources: { value: LeadSource; label: string }[] = [
  { value: "manual", label: "Manual" },
  { value: "phone", label: "Phone" },
  { value: "website", label: "Website" },
  { value: "gmail", label: "Gmail" },
  { value: "rightmove", label: "Rightmove" },
  { value: "zoopla", label: "Zoopla" },
  { value: "portal", label: "Other Portal" },
];

const statuses: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "warm", label: "Warm" },
];

export function ImportForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder — will integrate with Firestore on a later day
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <Card className="border border-border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <UserPlus className="h-4 w-4 text-muted-foreground" />
          Add Lead Manually
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <UserPlus className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-sm font-medium">Lead added successfully</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The lead will appear in your leads list
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm">Full name *</Label>
              <Input id="name" placeholder="John Smith" className="h-9 text-sm" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email *</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="h-9 text-sm" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm">Phone</Label>
              <Input id="phone" type="tel" placeholder="+447..." className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="property" className="text-sm">Property address *</Label>
              <Input id="property" placeholder="123 High Street, London" className="h-9 text-sm" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="leadType" className="text-sm">Lead type</Label>
              <select
                id="leadType"
                defaultValue="buyer"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {leadTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="source" className="text-sm">Source</Label>
              <select
                id="source"
                defaultValue="manual"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {leadSources.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="status" className="text-sm">Status</Label>
              <select
                id="status"
                defaultValue="new"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="assigned" className="text-sm">Assigned to</Label>
              <select
                id="assigned"
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Unassigned</option>
                <option value="user_001">Alice Morgan</option>
                <option value="user_002">Ben Taylor</option>
                <option value="user_003">Claire Davison</option>
              </select>
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="message" className="text-sm">Enquiry message</Label>
              <Textarea
                id="message"
                placeholder="Paste or type the original enquiry message..."
                className="min-h-[100px] text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="text-sm">
                Add Lead
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
