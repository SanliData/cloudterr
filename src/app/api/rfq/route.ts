import { NextRequest } from "next/server";
import { validateInput, sanitizePayload, type RfqPayload } from "@/lib/rfq";
import { checkRateLimit } from "@/lib/rateLimit";
import { isDuplicateLead } from "@/lib/duplicateLead";
import { storeLead } from "@/lib/storeLead";
import { notify } from "@/lib/notify";

export const runtime = "nodejs";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ success: false, error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, errors: { _form: "Geçersiz istek." } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (body.website != null && String(body.website).trim() !== "") {
    return new Response(
      JSON.stringify({ success: false, error: "Forbidden" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const sanitized = sanitizePayload(body);
  const { ok, errors } = validateInput(sanitized);
  if (!ok) {
    return new Response(JSON.stringify({ success: false, errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (isDuplicateLead(ip, sanitized.email)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Aynı e-posta ile kısa süre önce başvuru yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await storeLead(sanitized as RfqPayload, ip);
    await notify(sanitized as RfqPayload);
  } catch (err) {
    console.error("[RFQ] storeLead/notify error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Kayıt sırasında bir hata oluştu." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
