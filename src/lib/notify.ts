/**
 * RFQ e-posta bildirimi — Resend SDK ile.
 * RESEND_API_KEY yoksa lead yine kaydedilir, sadece mail atılmaz (log).
 */
import { Resend } from "resend";
import type { RfqPayload } from "./rfq";

const SUBJECT = "Yeni Teklif Talebi Başvurusu – Cloud Telecommunications";
const TO_EMAIL =
  process.env.RFQ_BILDIRIM_E_POSTASI ||
  process.env.RFQ_NOTIFY_EMAIL ||
  process.env.RESEND_TO_EMAIL ||
  "";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

function buildHtml(payload: RfqPayload, timestamp: string): string {
  return `
    <h2>Yeni Teklif Talebi Gönderimi</h2>
    <p><strong>Adı:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Şirket:</strong> ${escapeHtml(payload.company)}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(payload.phone || "—")}</p>
    <p><strong>Rol:</strong> ${escapeHtml(payload.role || "—")}</p>
    <p><strong>Proje tipi:</strong> ${escapeHtml(payload.projectType || "—")}</p>
    <p><strong>Konum:</strong> ${escapeHtml(payload.location || "—")}</p>
    <p><strong>Hedef başlangıç:</strong> ${escapeHtml(payload.startDate || "—")}</p>
    <p><strong>Proje Açıklaması:</strong></p>
    <p>${escapeHtml(payload.scope || "—")}</p>
    <p><strong>Zaman Damgası:</strong> ${escapeHtml(timestamp)}</p>
  `.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notify(payload: RfqPayload): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[RFQ] RESEND_API_KEY not set — email not sent. Lead stored.");
    return { sent: false };
  }
  if (!TO_EMAIL) {
    console.warn("[RFQ] RFQ_BILDIRIM_E_POSTASI / RFQ_NOTIFY_EMAIL / RESEND_TO_EMAIL not set — email not sent.");
    return { sent: false };
  }

  const timestamp = new Date().toISOString();
  const html = buildHtml(payload, timestamp);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: SUBJECT,
      html,
    });
    if (error) {
      console.error("[RFQ] Resend error:", error);
      return { sent: false, error: String(error.message) };
    }
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[RFQ] notify error:", message);
    return { sent: false, error: message };
  }
}
