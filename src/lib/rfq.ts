/**
 * RFQ uygulama seviyesi güvenlik: validateInput, sanitize.
 * storeLead / notify backend'de (API route) kullanılır.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const MAX_NAME = 120;
const MAX_STRING = 500;
const MAX_TEXTAREA = 2000;

export interface RfqPayload {
  company: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  projectType?: string;
  location?: string;
  startDate?: string;
  scope?: string;
  consent?: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

export function validateInput(payload: Partial<RfqPayload>): ValidationResult {
  const errors: Record<string, string> = {};

  const company = payload.company?.trim() ?? "";
  if (!company) errors.company = "Company is required.";
  else if (company.length > MAX_STRING) errors.company = `Max ${MAX_STRING} characters.`;

  const name = payload.name?.trim() ?? "";
  if (!name) errors.name = "Name is required.";
  else if (name.length > MAX_NAME) errors.name = `Max ${MAX_NAME} characters.`;

  const email = payload.email?.trim() ?? "";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email.";
  else if (email.length > 254) errors.email = "Email too long.";

  if (payload.phone && payload.phone.length > 50) errors.phone = "Phone max 50 characters.";
  if (payload.role && payload.role.length > MAX_STRING) errors.role = `Max ${MAX_STRING} characters.`;
  if (payload.location && payload.location.length > MAX_STRING) errors.location = `Max ${MAX_STRING} characters.`;
  if (payload.startDate && payload.startDate.length > 100) errors.startDate = "Max 100 characters.";
  if (payload.scope && payload.scope.length > MAX_TEXTAREA) errors.scope = `Max ${MAX_TEXTAREA} characters.`;

  if (!payload.consent || (payload.consent !== "on" && payload.consent !== "true"))
    errors.consent = "Consent is required.";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Kullanıcı girişini sanitize et — XSS / injection için.
 */
export function sanitize(str: string | undefined): string {
  if (str == null || typeof str !== "string") return "";
  return str
    .trim()
    .slice(0, MAX_TEXTAREA)
    .replace(/[<>]/g, "");
}

export function sanitizePayload(payload: Record<string, unknown>): RfqPayload {
  return {
    company: sanitize(payload.company as string).slice(0, MAX_STRING),
    name: sanitize(payload.name as string).slice(0, MAX_NAME),
    email: sanitize(payload.email as string).slice(0, 254),
    phone: sanitize(payload.phone as string).slice(0, 50) || undefined,
    role: sanitize(payload.role as string).slice(0, MAX_STRING) || undefined,
    projectType: sanitize(payload.projectType as string).slice(0, 100) || undefined,
    location: sanitize(payload.location as string).slice(0, MAX_STRING) || undefined,
    startDate: sanitize(payload.startDate as string).slice(0, 100) || undefined,
    scope: sanitize(payload.scope as string).slice(0, MAX_TEXTAREA) || undefined,
    consent: payload.consent ? "true" : undefined,
  };
}
