/**
 * Uygulama seviyesi rate limit — sabit IP haritası.
 * RFQ, iletişim formu vb. için istek sınırı.
 */

const WINDOW_MS = 60_000; // 1 dakika
const MAX_REQUESTS = 20;

const ipMap = new Map<string, { count: number; resetAt: number }>();

function prune() {
  const now = Date.now();
  for (const [key, value] of Array.from(ipMap.entries())) {
    if (value.resetAt < now) ipMap.delete(key);
  }
}

/**
 * IP başına istek sayısını kontrol eder.
 * @param ip - İstemci IP (örn. x-forwarded-for veya request.socket.remoteAddress)
 * @returns true = izin ver, false = limit aşıldı
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (ipMap.size > 1000) prune();

  const entry = ipMap.get(ip);
  if (!entry) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.resetAt < now) {
    entry.count = 1;
    entry.resetAt = now + WINDOW_MS;
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

export function getRateLimitWindowMs(): number {
  return WINDOW_MS;
}

export function getRateLimitMax(): number {
  return MAX_REQUESTS;
}
