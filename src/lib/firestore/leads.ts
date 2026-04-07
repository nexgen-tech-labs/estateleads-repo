import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./client";
import { convertTimestamps } from "./converter";
import type { Lead } from "@/types/lead";

function leadsCol(agencyId: string) {
  return collection(db, "agencies", agencyId, "leads");
}

export async function getLeads(agencyId: string): Promise<Lead[]> {
  const q = query(leadsCol(agencyId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) =>
    convertTimestamps<Lead>({ id: d.id, ...d.data() })
  );
}

export async function getLeadById(
  agencyId: string,
  leadId: string
): Promise<Lead | null> {
  const snap = await getDoc(doc(leadsCol(agencyId), leadId));
  if (!snap.exists()) return null;
  return convertTimestamps<Lead>({ id: snap.id, ...snap.data() });
}

export async function addLead(
  agencyId: string,
  lead: Omit<Lead, "id">
): Promise<string> {
  const now = Timestamp.now();
  const ref = await addDoc(leadsCol(agencyId), {
    ...lead,
    agencyId,
    createdAt: now,
    updatedAt: now,
  });
  return ref.id;
}

export async function updateLead(
  agencyId: string,
  leadId: string,
  updates: Partial<Omit<Lead, "id">>
): Promise<void> {
  await updateDoc(doc(leadsCol(agencyId), leadId), {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function getDashboardStats(agencyId: string) {
  const leads = await getLeads(agencyId);
  const today = new Date().toDateString();

  const newLeadsToday = leads.filter(
    (l) => new Date(l.createdAt).toDateString() === today
  ).length;

  const followUpsDue = leads.filter(
    (l) =>
      l.nextFollowUpAt &&
      new Date(l.nextFollowUpAt) <= new Date()
  ).length;

  const warmLeads = leads.filter(
    (l) => l.temperature === "warm" || l.temperature === "hot"
  ).length;

  return { newLeadsToday, followUpsDue, repliesSentToday: 0, warmLeads };
}
