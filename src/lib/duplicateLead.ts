/**
 * Aynı IP + aynı email 5 dakika içinde tekrar gelirse reddet.
 */
const WINDOW_MS = 5 * 60 * 1000; // 5 dakika
const keyToTimestamp = new Map<string, number>();

function prune() {
  const now = Date.now();
  for (const [key, ts] of Array.from(keyToTimestamp.entries())) {
    if (now - ts > WINDOW_MS) keyToTimestamp.delete(key);
  }
}

export function isDuplicateLead(ip: string, email: string): boolean {
  const key = `${ip}:${email.toLowerCase().trim()}`;
  const now = Date.now();
  if (keyToTimestamp.size > 5000) prune();
  const last = keyToTimestamp.get(key);
  if (last != null && now - last < WINDOW_MS) return true;
  keyToTimestamp.set(key, now);
  return false;
}
