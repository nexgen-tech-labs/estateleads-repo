import { Lead, ActivityItem, NoteItem, FollowUpItem, AssignedUser } from "@/types/lead";

export const assignedUsers: AssignedUser[] = [
  { id: "user_001", name: "Alice Morgan", email: "alice@harbourhomes.co.uk" },
  { id: "user_002", name: "Ben Taylor", email: "ben@harbourhomes.co.uk" },
  { id: "user_003", name: "Claire Davison", email: "claire@harbourhomes.co.uk" },
];

export const mockLeads: Lead[] = [
  {
    id: "lead_001",
    agencyId: "agency_001",
    source: "gmail",
    propertyAddress: "12 Marine Road, Southsea, PO5 3AQ",
    propertyReference: "PROP-1002",
    leadType: "buyer",
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    phone: "+447700900123",
    message: "Hi, I am interested in viewing the 3-bed house this week. Is it still available? We are chain-free and have a mortgage in principle.",
    status: "new",
    temperature: "hot",
    assignedTo: "user_001",
    createdAt: "2026-04-01T09:15:00Z",
    updatedAt: "2026-04-01T09:15:00Z",
  },
  {
    id: "lead_002",
    agencyId: "agency_001",
    source: "website",
    propertyAddress: "45 Kings Terrace, Portsmouth, PO1 2NU",
    leadType: "buyer",
    name: "James Carter",
    email: "james.carter@email.com",
    phone: "+447700900456",
    message: "Does this property come with off-road parking? We would like to arrange a viewing if so. Also, is the garden south-facing?",
    status: "contacted",
    temperature: "warm",
    lastContactedAt: "2026-03-31T14:00:00Z",
    nextFollowUpAt: "2026-04-02T10:00:00Z",
    assignedTo: "user_002",
    createdAt: "2026-03-31T11:00:00Z",
    updatedAt: "2026-03-31T14:00:00Z",
  },
  {
    id: "lead_003",
    agencyId: "agency_001",
    source: "gmail",
    propertyAddress: "8 Elm Grove, Brighton, BN2 3ES",
    leadType: "seller",
    name: "Patricia Holmes",
    email: "p.holmes@email.com",
    phone: "+447700900654",
    message: "We are considering selling our 4-bed detached property and would like a valuation. When can someone visit? Ideally this week.",
    status: "new",
    temperature: "hot",
    assignedTo: "user_001",
    createdAt: "2026-04-01T08:30:00Z",
    updatedAt: "2026-04-01T08:30:00Z",
  },
  {
    id: "lead_004",
    agencyId: "agency_001",
    source: "rightmove",
    propertyAddress: "22 Victoria Road, Chichester, PO19 7HB",
    propertyReference: "RM-45821",
    leadType: "buyer",
    name: "David Thompson",
    email: "d.thompson@email.com",
    phone: "+447700900789",
    message: "Has an offer already been accepted on this property? We are ready to proceed quickly — first-time buyers with mortgage approved.",
    status: "awaiting_reply",
    temperature: "hot",
    lastContactedAt: "2026-03-30T16:00:00Z",
    assignedTo: "user_003",
    createdAt: "2026-03-30T10:00:00Z",
    updatedAt: "2026-03-30T16:00:00Z",
  },
  {
    id: "lead_005",
    agencyId: "agency_001",
    source: "manual",
    propertyAddress: "15 Albert Road, Southsea, PO4 0JY",
    leadType: "renter",
    name: "Michael O'Brien",
    email: "m.obrien@email.com",
    phone: "+447700900321",
    message: "When is the earliest move-in date for the 2-bed flat? I need to relocate for work by mid-April. Happy to provide references.",
    status: "viewing_requested",
    temperature: "warm",
    lastContactedAt: "2026-03-31T09:00:00Z",
    nextFollowUpAt: "2026-04-01T09:00:00Z",
    assignedTo: "user_002",
    createdAt: "2026-03-29T15:00:00Z",
    updatedAt: "2026-03-31T09:00:00Z",
  },
  {
    id: "lead_006",
    agencyId: "agency_001",
    source: "zoopla",
    propertyAddress: "3 Chapel Lane, Winchester, SO23 9RD",
    propertyReference: "ZP-78432",
    leadType: "buyer",
    name: "Fiona Greenwood",
    email: "f.greenwood@email.com",
    message: "Could you tell me about the school catchment area for this property? We have two primary-age children and this is a key factor.",
    status: "contacted",
    temperature: "warm",
    lastContactedAt: "2026-03-30T11:00:00Z",
    nextFollowUpAt: "2026-04-03T10:00:00Z",
    assignedTo: "user_001",
    createdAt: "2026-03-29T16:00:00Z",
    updatedAt: "2026-03-30T11:00:00Z",
  },
  {
    id: "lead_007",
    agencyId: "agency_001",
    source: "gmail",
    propertyAddress: "Unit 14, The Dockyard, Portsmouth, PO1 3TJ",
    leadType: "investor",
    name: "Raj Patel",
    email: "raj.patel@investco.com",
    phone: "+447700900555",
    message: "I am looking at this property as a buy-to-let investment. Is it chain-free? What is the current rental yield in this area? Happy to move quickly.",
    status: "warm",
    temperature: "warm",
    lastContactedAt: "2026-03-28T10:00:00Z",
    nextFollowUpAt: "2026-04-02T10:00:00Z",
    assignedTo: "user_003",
    createdAt: "2026-03-27T14:00:00Z",
    updatedAt: "2026-03-28T10:00:00Z",
  },
  {
    id: "lead_008",
    agencyId: "agency_001",
    source: "phone",
    propertyAddress: "29 Ocean View, Eastbourne, BN21 3PQ",
    leadType: "seller",
    name: "Margaret & Colin Wright",
    email: "m.wright@email.com",
    phone: "+447700900112",
    message: "We would like to speak with the branch manager about selling our property. We have lived here 25 years and want to downsize. Can someone call us back?",
    status: "new",
    temperature: "warm",
    assignedTo: "user_001",
    createdAt: "2026-04-01T10:45:00Z",
    updatedAt: "2026-04-01T10:45:00Z",
  },
  {
    id: "lead_009",
    agencyId: "agency_001",
    source: "website",
    propertyAddress: "Flat 2, 88 London Road, Guildford, GU1 2AA",
    leadType: "renter",
    name: "Tom Henderson",
    email: "t.henderson@email.com",
    message: "Is this flat still available for rent from May? I am a young professional relocating to Guildford. Can provide employer references.",
    status: "cold",
    temperature: "cold",
    lastContactedAt: "2026-03-25T09:00:00Z",
    assignedTo: "user_002",
    createdAt: "2026-03-20T10:00:00Z",
    updatedAt: "2026-03-25T09:00:00Z",
  },
  {
    id: "lead_010",
    agencyId: "agency_001",
    source: "portal",
    propertyAddress: "7 Harbour View, Southampton, SO14 3FE",
    propertyReference: "SOT-9927",
    leadType: "landlord",
    name: "Karen Mitchell",
    email: "k.mitchell@landlordmail.com",
    phone: "+447700900998",
    message: "I own a 2-bed flat near the waterfront and am looking for a letting agent. What are your management fees and tenant-find charges?",
    status: "viewing_booked",
    temperature: "hot",
    lastContactedAt: "2026-04-01T08:00:00Z",
    nextFollowUpAt: "2026-04-03T08:00:00Z",
    assignedTo: "user_003",
    createdAt: "2026-03-28T12:00:00Z",
    updatedAt: "2026-04-01T08:00:00Z",
  },
];

export const mockActivities: ActivityItem[] = [
  { id: "act_001", leadId: "lead_001", type: "lead_created", description: "Lead captured from Gmail", createdAt: "2026-04-01T09:15:00Z" },
  { id: "act_002", leadId: "lead_002", type: "lead_created", description: "Lead captured from website form", createdAt: "2026-03-31T11:00:00Z" },
  { id: "act_003", leadId: "lead_002", type: "email_sent", description: "Initial reply sent by Ben Taylor", user: "user_002", createdAt: "2026-03-31T14:00:00Z" },
  { id: "act_004", leadId: "lead_002", type: "status_change", description: "Status changed from New to Contacted", user: "user_002", createdAt: "2026-03-31T14:01:00Z" },
  { id: "act_005", leadId: "lead_002", type: "follow_up_scheduled", description: "Follow-up scheduled for 2 Apr", user: "user_002", createdAt: "2026-03-31T14:02:00Z" },
  { id: "act_006", leadId: "lead_003", type: "lead_created", description: "Lead captured from Gmail", createdAt: "2026-04-01T08:30:00Z" },
  { id: "act_007", leadId: "lead_004", type: "lead_created", description: "Lead captured from Rightmove", createdAt: "2026-03-30T10:00:00Z" },
  { id: "act_008", leadId: "lead_004", type: "email_sent", description: "Reply sent by Claire Davison", user: "user_003", createdAt: "2026-03-30T16:00:00Z" },
  { id: "act_009", leadId: "lead_005", type: "lead_created", description: "Lead added manually by Ben Taylor", user: "user_002", createdAt: "2026-03-29T15:00:00Z" },
  { id: "act_010", leadId: "lead_005", type: "status_change", description: "Status changed to Viewing Requested", user: "user_002", createdAt: "2026-03-31T09:00:00Z" },
  { id: "act_011", leadId: "lead_006", type: "lead_created", description: "Lead captured from Zoopla", createdAt: "2026-03-29T16:00:00Z" },
  { id: "act_012", leadId: "lead_007", type: "lead_created", description: "Lead captured from Gmail", createdAt: "2026-03-27T14:00:00Z" },
  { id: "act_013", leadId: "lead_008", type: "lead_created", description: "Lead added from phone call", createdAt: "2026-04-01T10:45:00Z" },
  { id: "act_014", leadId: "lead_010", type: "lead_created", description: "Lead captured from portal", createdAt: "2026-03-28T12:00:00Z" },
  { id: "act_015", leadId: "lead_010", type: "status_change", description: "Status changed to Viewing Booked", user: "user_003", createdAt: "2026-04-01T08:00:00Z" },
];

export const mockNotes: NoteItem[] = [
  { id: "note_001", leadId: "lead_001", content: "Chain-free buyer, mortgage in principle. Prioritise viewing this week.", author: "Alice Morgan", createdAt: "2026-04-01T09:20:00Z" },
  { id: "note_002", leadId: "lead_002", content: "Confirmed parking is available. Awaiting response about viewing date.", author: "Ben Taylor", createdAt: "2026-03-31T14:05:00Z" },
  { id: "note_003", leadId: "lead_004", content: "No offer accepted yet. Buyers are motivated — first-time with mortgage approved.", author: "Claire Davison", createdAt: "2026-03-30T16:05:00Z" },
  { id: "note_004", leadId: "lead_005", content: "Work relocation. Needs move-in by mid-April. Check availability with landlord.", author: "Ben Taylor", createdAt: "2026-03-31T09:05:00Z" },
  { id: "note_005", leadId: "lead_007", content: "BTL investor. Interested in rental yield info. Send comparable rental data.", author: "Claire Davison", createdAt: "2026-03-28T10:10:00Z" },
  { id: "note_006", leadId: "lead_010", content: "Landlord looking for management service. Meeting booked for 3 Apr at office.", author: "Claire Davison", createdAt: "2026-04-01T08:05:00Z" },
];

export const mockFollowUps: FollowUpItem[] = [
  { id: "fu_001", leadId: "lead_002", step: 1, scheduledAt: "2026-04-02T10:00:00Z", status: "pending" },
  { id: "fu_002", leadId: "lead_002", step: 2, scheduledAt: "2026-04-04T10:00:00Z", status: "pending" },
  { id: "fu_003", leadId: "lead_002", step: 3, scheduledAt: "2026-04-08T10:00:00Z", status: "pending" },
  { id: "fu_004", leadId: "lead_005", step: 1, scheduledAt: "2026-04-01T09:00:00Z", status: "sent" },
  { id: "fu_005", leadId: "lead_006", step: 1, scheduledAt: "2026-04-03T10:00:00Z", status: "pending" },
  { id: "fu_006", leadId: "lead_007", step: 1, scheduledAt: "2026-04-02T10:00:00Z", status: "pending" },
  { id: "fu_007", leadId: "lead_010", step: 1, scheduledAt: "2026-04-03T08:00:00Z", status: "pending" },
];

export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find((l) => l.id === id);
}

export function getActivitiesForLead(leadId: string): ActivityItem[] {
  return mockActivities.filter((a) => a.leadId === leadId);
}

export function getNotesForLead(leadId: string): NoteItem[] {
  return mockNotes.filter((n) => n.leadId === leadId);
}

export function getFollowUpsForLead(leadId: string): FollowUpItem[] {
  return mockFollowUps.filter((f) => f.leadId === leadId);
}

export function getAssignedUser(userId?: string): AssignedUser | undefined {
  return assignedUsers.find((u) => u.id === userId);
}

const _importedLeads: Lead[] = [];

export function addImportedLeads(leads: Lead[]): void {
  _importedLeads.push(...leads);
}

export function getAllLeads(): Lead[] {
  return [...mockLeads, ..._importedLeads];
}

export const dashboardStats = {
  newLeadsToday: 3,
  followUpsDue: 5,
  repliesSentToday: 8,
  warmLeads: 12,
};
