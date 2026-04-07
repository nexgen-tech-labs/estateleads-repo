import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./client";
import type { AssignedUser } from "@/types/lead";

// ── Agency users ─────────────────────────────────────────────────────────────

export async function getAgencyUsers(agencyId: string): Promise<AssignedUser[]> {
  const snap = await getDocs(collection(db, "agencies", agencyId, "users"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AssignedUser));
}

// ── User profile (top-level /users/{uid}) ────────────────────────────────────

export interface UserProfile {
  uid: string;
  agencyId: string;
  name: string;
  email: string;
  agencyName: string;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { uid, ...snap.data() } as UserProfile;
}

export async function createUserAndAgency(
  uid: string,
  name: string,
  email: string,
  agencyName: string
): Promise<string> {
  const agencyId = `agency_${uid}`;
  const now = Timestamp.now();

  // Create agency
  await setDoc(doc(db, "agencies", agencyId), {
    name: agencyName,
    ownerId: uid,
    createdAt: now,
  });

  // Create agency user entry
  await setDoc(doc(db, "agencies", agencyId, "users", uid), {
    name,
    email,
  });

  // Create top-level user profile (used by auth context to get agencyId)
  await setDoc(doc(db, "users", uid), {
    agencyId,
    name,
    email,
    agencyName,
    createdAt: now,
  });

  return agencyId;
}
