import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./client";
import { convertTimestamps } from "./converter";
import type { ActivityItem, NoteItem, FollowUpItem } from "@/types/lead";

// ── Activities ───────────────────────────────────────────────────────────────

function activitiesCol(agencyId: string, leadId: string) {
  return collection(db, "agencies", agencyId, "leads", leadId, "activities");
}

export async function getActivities(
  agencyId: string,
  leadId: string
): Promise<ActivityItem[]> {
  const q = query(activitiesCol(agencyId, leadId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) =>
    convertTimestamps<ActivityItem>({ id: d.id, leadId, ...d.data() })
  );
}

export async function addActivity(
  agencyId: string,
  leadId: string,
  activity: Omit<ActivityItem, "id" | "leadId">
): Promise<void> {
  await addDoc(activitiesCol(agencyId, leadId), {
    ...activity,
    createdAt: Timestamp.now(),
  });
}

// ── Notes ────────────────────────────────────────────────────────────────────

function notesCol(agencyId: string, leadId: string) {
  return collection(db, "agencies", agencyId, "leads", leadId, "notes");
}

export async function getNotes(
  agencyId: string,
  leadId: string
): Promise<NoteItem[]> {
  const q = query(notesCol(agencyId, leadId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) =>
    convertTimestamps<NoteItem>({ id: d.id, leadId, ...d.data() })
  );
}

export async function addNote(
  agencyId: string,
  leadId: string,
  note: Omit<NoteItem, "id" | "leadId">
): Promise<void> {
  await addDoc(notesCol(agencyId, leadId), {
    ...note,
    createdAt: Timestamp.now(),
  });
}

// ── Follow-ups ───────────────────────────────────────────────────────────────

function followupsCol(agencyId: string, leadId: string) {
  return collection(db, "agencies", agencyId, "leads", leadId, "followups");
}

export async function getFollowups(
  agencyId: string,
  leadId: string
): Promise<FollowUpItem[]> {
  const q = query(followupsCol(agencyId, leadId), orderBy("scheduledAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) =>
    convertTimestamps<FollowUpItem>({ id: d.id, leadId, ...d.data() })
  );
}
