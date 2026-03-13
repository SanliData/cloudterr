/**
 * Store lead-gen submissions (land evaluation, broker partnership, energy report).
 */
import type { LeadType, LeadPayload, StoredLeadRecord } from "./lead";
import { promises as fs } from "fs";
import path from "path";

const LEADS_DIR = path.join(process.cwd(), "data");
const LEAD_GEN_FILE = path.join(LEADS_DIR, "lead-gen.json");

async function ensureFile(): Promise<StoredLeadRecord[]> {
  try {
    await fs.mkdir(LEADS_DIR, { recursive: true });
  } catch {
    // dir exists
  }
  try {
    const raw = await fs.readFile(LEAD_GEN_FILE, "utf-8");
    const data = JSON.parse(raw) as StoredLeadRecord[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function storeLeadRecord(
  leadType: LeadType,
  payload: LeadPayload,
  ip: string
): Promise<void> {
  const record: StoredLeadRecord = {
    timestamp: new Date().toISOString(),
    ip,
    leadType,
    payload,
  };
  const leads = await ensureFile();
  leads.push(record);
  await fs.writeFile(LEAD_GEN_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
