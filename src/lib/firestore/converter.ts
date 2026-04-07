import { Timestamp } from "firebase/firestore";

/**
 * Recursively converts Firestore Timestamps to ISO strings so our
 * TypeScript types (which use string for dates) stay consistent.
 */
export function convertTimestamps<T>(data: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate().toISOString();
    } else {
      result[key] = value;
    }
  }
  return result as T;
}
