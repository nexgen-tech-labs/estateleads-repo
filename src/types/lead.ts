export type LeadStatus =
  | "new"
  | "contacted"
  | "awaiting_reply"
  | "viewing_requested"
  | "viewing_booked"
  | "warm"
  | "cold"
  | "closed_won"
  | "closed_lost";

export type LeadSource = "gmail" | "csv" | "manual" | "website" | "rightmove" | "zoopla" | "portal" | "phone";

export type LeadTemperature = "hot" | "warm" | "cold";

export type LeadType = "buyer" | "seller" | "renter" | "landlord" | "investor";

export interface AssignedUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  agencyId: string;
  source: LeadSource;
  sourceRef?: string;
  propertyAddress: string;
  propertyReference?: string;
  leadType: LeadType;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: LeadStatus;
  temperature: LeadTemperature;
  budget?: string;
  timeline?: string;
  notes?: string;
  aiSummary?: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  leadId: string;
  type: "status_change" | "note_added" | "email_sent" | "email_received" | "follow_up_scheduled" | "lead_created" | "ai_reply_generated";
  description: string;
  user?: string;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  leadId: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface FollowUpItem {
  id: string;
  leadId: string;
  step: 1 | 2 | 3;
  scheduledAt: string;
  status: "pending" | "sent" | "skipped";
  message?: string;
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  awaiting_reply: "Awaiting Reply",
  viewing_requested: "Viewing Requested",
  viewing_booked: "Viewing Booked",
  warm: "Warm",
  cold: "Cold",
  closed_won: "Closed Won",
  closed_lost: "Closed Lost",
};

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  gmail: "Gmail",
  csv: "CSV Import",
  manual: "Manual",
  website: "Website",
  rightmove: "Rightmove",
  zoopla: "Zoopla",
  portal: "Portal",
  phone: "Phone",
};

export const LEAD_TYPE_LABELS: Record<LeadType, string> = {
  buyer: "Buyer",
  seller: "Seller",
  renter: "Renter",
  landlord: "Landlord",
  investor: "Investor",
};
