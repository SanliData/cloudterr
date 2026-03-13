/**
 * Lead generation: land evaluation, broker partnership, energy report.
 * Validation and sanitization per lead type.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const MAX_NAME = 120;
const MAX_STRING = 500;
const MAX_TEXTAREA = 2000;

export type LeadType = "land-evaluation" | "broker-partnership" | "energy-report";

export interface LandEvaluationPayload {
  name: string;
  email: string;
  phone?: string;
  landLocation: string;
  landSize: string;
  mapNote?: string; // optional upload described in UI
  consent?: string;
}

export interface BrokerPartnershipPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  consent?: string;
}

export interface EnergyReportPayload {
  companyName: string;
  dataCenterLocation: string;
  facilitySizeMw?: string;
  currentCoolingSystem?: string;
  contactEmail: string;
  consent?: string;
}

export type LeadPayload = LandEvaluationPayload | BrokerPartnershipPayload | EnergyReportPayload;

export interface StoredLeadRecord {
  timestamp: string;
  ip: string;
  leadType: LeadType;
  payload: LeadPayload;
}

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

function sanitize(str: string | undefined, maxLen: number = MAX_STRING): string {
  if (str == null || typeof str !== "string") return "";
  return str.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

export function validateLandEvaluation(p: Partial<LandEvaluationPayload>): ValidationResult {
  const errors: Record<string, string> = {};
  const name = p.name?.trim() ?? "";
  if (!name) errors.name = "Name is required.";
  else if (name.length > MAX_NAME) errors.name = `Max ${MAX_NAME} characters.`;
  const email = p.email?.trim() ?? "";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email.";
  if (p.phone && p.phone.length > 50) errors.phone = "Phone max 50 characters.";
  const landLocation = p.landLocation?.trim() ?? "";
  if (!landLocation) errors.landLocation = "Land location is required.";
  else if (landLocation.length > MAX_STRING) errors.landLocation = `Max ${MAX_STRING} characters.`;
  const landSize = p.landSize?.trim() ?? "";
  if (!landSize) errors.landSize = "Land size is required.";
  else if (landSize.length > 100) errors.landSize = "Max 100 characters.";
  if (p.mapNote && p.mapNote.length > 500) errors.mapNote = "Max 500 characters.";
  if (!p.consent || (p.consent !== "on" && p.consent !== "true")) errors.consent = "Consent is required.";
  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateBrokerPartnership(p: Partial<BrokerPartnershipPayload>): ValidationResult {
  const errors: Record<string, string> = {};
  const name = p.name?.trim() ?? "";
  if (!name) errors.name = "Name is required.";
  else if (name.length > MAX_NAME) errors.name = `Max ${MAX_NAME} characters.`;
  const email = p.email?.trim() ?? "";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email.";
  if (p.phone && p.phone.length > 50) errors.phone = "Phone max 50 characters.";
  if (p.company && p.company.length > MAX_STRING) errors.company = `Max ${MAX_STRING} characters.`;
  if (p.message && p.message.length > MAX_TEXTAREA) errors.message = `Max ${MAX_TEXTAREA} characters.`;
  if (!p.consent || (p.consent !== "on" && p.consent !== "true")) errors.consent = "Consent is required.";
  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateEnergyReport(p: Partial<EnergyReportPayload>): ValidationResult {
  const errors: Record<string, string> = {};
  const companyName = p.companyName?.trim() ?? "";
  if (!companyName) errors.companyName = "Company name is required.";
  else if (companyName.length > MAX_STRING) errors.companyName = `Max ${MAX_STRING} characters.`;
  const dataCenterLocation = p.dataCenterLocation?.trim() ?? "";
  if (!dataCenterLocation) errors.dataCenterLocation = "Data center location is required.";
  else if (dataCenterLocation.length > MAX_STRING) errors.dataCenterLocation = `Max ${MAX_STRING} characters.`;
  const contactEmail = p.contactEmail?.trim() ?? "";
  if (!contactEmail) errors.contactEmail = "Contact email is required.";
  else if (!EMAIL_REGEX.test(contactEmail)) errors.contactEmail = "Enter a valid email.";
  if (p.facilitySizeMw && p.facilitySizeMw.length > 50) errors.facilitySizeMw = "Max 50 characters.";
  if (p.currentCoolingSystem && p.currentCoolingSystem.length > MAX_STRING) errors.currentCoolingSystem = `Max ${MAX_STRING} characters.`;
  if (!p.consent || (p.consent !== "on" && p.consent !== "true")) errors.consent = "Consent is required.";
  return { ok: Object.keys(errors).length === 0, errors };
}

export function sanitizeLandEvaluation(body: Record<string, unknown>): LandEvaluationPayload {
  return {
    name: sanitize(body.name as string, MAX_NAME),
    email: sanitize(body.email as string, 254),
    phone: sanitize(body.phone as string, 50) || undefined,
    landLocation: sanitize(body.landLocation as string),
    landSize: sanitize(body.landSize as string, 100),
    mapNote: sanitize(body.mapNote as string, 500) || undefined,
    consent: body.consent ? "true" : undefined,
  };
}

export function sanitizeBrokerPartnership(body: Record<string, unknown>): BrokerPartnershipPayload {
  return {
    name: sanitize(body.name as string, MAX_NAME),
    email: sanitize(body.email as string, 254),
    phone: sanitize(body.phone as string, 50) || undefined,
    company: sanitize(body.company as string) || undefined,
    message: sanitize(body.message as string, MAX_TEXTAREA) || undefined,
    consent: body.consent ? "true" : undefined,
  };
}

export function sanitizeEnergyReport(body: Record<string, unknown>): EnergyReportPayload {
  return {
    companyName: sanitize(body.companyName as string),
    dataCenterLocation: sanitize(body.dataCenterLocation as string),
    facilitySizeMw: sanitize(body.facilitySizeMw as string, 50) || undefined,
    currentCoolingSystem: sanitize(body.currentCoolingSystem as string) || undefined,
    contactEmail: sanitize(body.contactEmail as string, 254),
    consent: body.consent ? "true" : undefined,
  };
}

export function validateLead(type: LeadType, payload: LeadPayload): ValidationResult {
  switch (type) {
    case "land-evaluation":
      return validateLandEvaluation(payload as LandEvaluationPayload);
    case "broker-partnership":
      return validateBrokerPartnership(payload as BrokerPartnershipPayload);
    case "energy-report":
      return validateEnergyReport(payload as EnergyReportPayload);
    default:
      return { ok: false, errors: { _form: "Invalid lead type." } };
  }
}

export function sanitizeLead(type: LeadType, body: Record<string, unknown>): LeadPayload {
  switch (type) {
    case "land-evaluation":
      return sanitizeLandEvaluation(body);
    case "broker-partnership":
      return sanitizeBrokerPartnership(body);
    case "energy-report":
      return sanitizeEnergyReport(body);
    default:
      throw new Error("Invalid lead type.");
  }
}
