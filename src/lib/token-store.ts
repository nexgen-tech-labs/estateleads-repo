/**
 * Shared in-memory token store for Gmail OAuth tokens.
 * Both /api/gmail/callback and /api/gmail/sync import from here
 * so they share the same Map instance within a single server process.
 *
 * NOTE: This is an MVP approach — tokens are lost on server restart.
 * Replace with Firestore storage for production.
 */

interface GmailTokens {
  access_token?: string | null;
  refresh_token?: string | null;
  expiry_date?: number | null;
  token_type?: string | null;
  email?: string;
}

const store = new Map<string, GmailTokens>();

export function saveTokens(tokens: GmailTokens): string {
  const id = `token_${Date.now()}`;
  store.set(id, tokens);
  return id;
}

export function getTokens(id: string): GmailTokens | null {
  return store.get(id) ?? null;
}

export function hasTokens(id: string): boolean {
  return store.has(id);
}

export function deleteTokens(id: string): void {
  store.delete(id);
}
