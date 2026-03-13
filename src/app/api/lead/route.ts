import { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { isDuplicateLead } from "@/lib/duplicateLead";
import {
  type LeadType,
  validateLead,
  sanitizeLead,
  type LeadPayload,
} from "@/lib/lead";
import { storeLeadRecord } from "@/lib/leadStore";
import { notifyLead } from "@/lib/notifyLead";

export const runtime = "nodejs";

const VALID_TYPES: LeadType[] = ["land-evaluation", "broker-partnership", "energy-report"];

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function getEmail(payload: LeadPayload, type: LeadType): string {
  if ("email" in payload && payload.email) return payload.email;
  if ("contactEmail" in payload && payload.contactEmail) return payload.contactEmail;
  return "";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, errors: { _form: "Invalid request." } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (body.website != null && String(body.website).trim() !== "") {
    return new Response(
      JSON.stringify({ success: false, error: "Forbidden" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const rawType = body.leadType as string | undefined;
  if (!rawType || !VALID_TYPES.includes(rawType as LeadType)) {
    return new Response(
      JSON.stringify({ success: false, errors: { _form: "Invalid lead type." } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const leadType = rawType as LeadType;
  let payload: LeadPayload;
  try {
    payload = sanitizeLead(leadType, body);
  } catch {
    return new Response(
      JSON.stringify({ success: false, errors: { _form: "Invalid payload." } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { ok, errors } = validateLead(leadType, payload);
  if (!ok) {
    return new Response(JSON.stringify({ success: false, errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = getEmail(payload, leadType);
  if (email && isDuplicateLead(ip, email)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "A submission with this email was sent recently. Please try again in a few minutes.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await storeLeadRecord(leadType, payload, ip);
    await notifyLead(leadType, payload);
  } catch (err) {
    console.error("[Lead] storeLeadRecord/notify error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred. Please try again or contact us directly." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
