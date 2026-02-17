/**
 * Lead'i kalıcı olarak kaydet — minimum viable: JSON dosyasına ekleme.
 * Zaman damgası, IP ve yük loglanır. Lead kaybı kabul edilemez.
 */
import type { RfqPayload } from "./rfq";
import { promises as fs } from "fs";
import path from "path";

export interface StoredLead {
  timestamp: string;
  ip: string;
  payload: RfqPayload;
}

const LEADS_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.json");

async function ensureLeadsFile(): Promise<StoredLead[]> {
  try {
    await fs.mkdir(LEADS_DIR, { recursive: true });
  } catch {
    // dir exists
  }
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const data = JSON.parse(raw) as StoredLead[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function storeLead(payload: RfqPayload, ip: string): Promise<void> {
  const record: StoredLead = {
    timestamp: new Date().toISOString(),
    ip,
    payload,
  };
  const leads = await ensureLeadsFile();
  leads.push(record);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
