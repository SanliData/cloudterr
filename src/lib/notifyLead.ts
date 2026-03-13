/**
 * Email notification for lead-gen submissions (Resend).
 */
import { Resend } from "resend";
import type { LeadType, LeadPayload, LandEvaluationPayload, BrokerPartnershipPayload, EnergyReportPayload } from "./lead";

const TO_EMAIL =
  process.env.RFQ_BILDIRIM_E_POSTASI ||
  process.env.RFQ_NOTIFY_EMAIL ||
  process.env.RESEND_TO_EMAIL ||
  "";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | undefined): string {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value ?? "—")}</p>`;
}

function buildLandEvaluationHtml(p: LandEvaluationPayload, timestamp: string): string {
  return `
    <h2>Free Land Evaluation Request</h2>
    ${row("Name", p.name)}
    ${row("Email", p.email)}
    ${row("Phone", p.phone)}
    ${row("Land Location", p.landLocation)}
    ${row("Land Size", p.landSize)}
    ${row("Map / Notes", p.mapNote ?? undefined)}
    <p><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
  `.trim();
}

function buildBrokerPartnershipHtml(p: BrokerPartnershipPayload, timestamp: string): string {
  return `
    <h2>Broker Partnership / Property Opportunity</h2>
    ${row("Name", p.name)}
    ${row("Email", p.email)}
    ${row("Phone", p.phone)}
    ${row("Company", p.company)}
    ${row("Message", p.message)}
    <p><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
  `.trim();
}

function buildEnergyReportHtml(p: EnergyReportPayload, timestamp: string): string {
  return `
    <h2>Free Data Center Energy Assessment Request</h2>
    ${row("Company Name", p.companyName)}
    ${row("Data Center Location", p.dataCenterLocation)}
    ${row("Facility Size (MW)", p.facilitySizeMw)}
    ${row("Current Cooling System", p.currentCoolingSystem)}
    ${row("Contact Email", p.contactEmail)}
    <p><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
  `.trim();
}

export async function notifyLead(
  leadType: LeadType,
  payload: LeadPayload
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Lead] RESEND_API_KEY not set — email not sent. Lead stored.");
    return { sent: false };
  }
  if (!TO_EMAIL) {
    console.warn("[Lead] RFQ_NOTIFY_EMAIL not set — email not sent.");
    return { sent: false };
  }

  const timestamp = new Date().toISOString();
  let subject: string;
  let html: string;

  switch (leadType) {
    case "land-evaluation":
      subject = "Free Land Evaluation Request – CloudTelc";
      html = buildLandEvaluationHtml(payload as LandEvaluationPayload, timestamp);
      break;
    case "broker-partnership":
      subject = "Broker Partnership / Property Opportunity – CloudTelc";
      html = buildBrokerPartnershipHtml(payload as BrokerPartnershipPayload, timestamp);
      break;
    case "energy-report":
      subject = "Free Data Center Energy Assessment Request – CloudTelc";
      html = buildEnergyReportHtml(payload as EnergyReportPayload, timestamp);
      break;
    default:
      return { sent: false, error: "Unknown lead type" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      html,
    });
    if (error) {
      console.error("[Lead] Resend error:", error);
      return { sent: false, error: String(error.message) };
    }
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Lead] notify error:", message);
    return { sent: false, error: message };
  }
}
