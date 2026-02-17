/**
 * Intent classifier for Fiber Chat Assistant
 * Case-insensitive term matching and keyword detection
 */

import { chatGlossaryTerms } from "@/data/chatGlossary";

export type ChatMode = "glossary" | "project" | "lead" | "fallback";

const PROJECT_KEYWORDS = [
  "road crossing",
  "highway",
  "street crossing",
  "hdd",
  "horizontal directional drilling",
  "bore",
  "trench",
  "trenching",
  "aerial",
  "pole",
  "ftth",
  "fttp",
  "data center",
  "datacenter",
  "conduit",
  "microtrench",
  "plowing",
  "permitting",
  "permit",
  "row",
  "right-of-way",
  "811",
  "installation",
  "construction",
  "deployment",
  "build",
  "route",
  "splicing",
  "handhole",
  "vault",
  "manhole",
  "cabinet",
  "pedestal",
  "splitter",
  "backbone",
  "metro",
  "last-mile",
  "middle-mile",
];

const LEAD_KEYWORDS = [
  "quote",
  "quotation",
  "price",
  "pricing",
  "cost",
  "estimate",
  "contact",
  "proposal",
  "rfq",
  "request for quote",
  "how much",
  "budget",
  "bid",
];

function normalizeTerm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[()]/g, "")
    .trim();
}

function extractTermFromQuestion(input: string): string {
  let s = input.trim().replace(/\?+$/, "").trim();
  const prefixes = [/^what\s+is\s+/i, /^define\s+/i, /^the\s+definition\s+of\s+/i, /^meaning\s+of\s+/i, /^explain\s+/i];
  for (const p of prefixes) {
    s = s.replace(p, "").trim();
  }
  return s;
}

function findGlossaryMatch(input: string): { term: string; definition: string; category: string } | null {
  const extracted = extractTermFromQuestion(input);
  const normalizedInput = normalizeTerm(extracted);
  if (!normalizedInput || normalizedInput.length < 2) return null;

  for (const t of chatGlossaryTerms) {
    const termNorm = normalizeTerm(t.term);
    const termCore = termNorm.replace(/\s*\([^)]*\)\s*/g, "").trim();
    if (
      termNorm === normalizedInput ||
      normalizedInput === termNorm ||
      termCore === normalizedInput ||
      normalizedInput.includes(termNorm) ||
      termNorm.includes(normalizedInput) ||
      normalizedInput.includes(termCore) ||
      termCore.includes(normalizedInput)
    ) {
      return { term: t.term, definition: t.definition, category: t.category };
    }
  }
  return null;
}

function hasKeyword(input: string, keywords: string[]): boolean {
  const n = normalizeTerm(input);
  return keywords.some((k) => n.includes(k.toLowerCase()));
}

export function classifyIntent(userMessage: string): {
  mode: ChatMode;
  glossaryMatch?: { term: string; definition: string; category: string };
} {
  const msg = userMessage.trim();
  if (!msg) return { mode: "fallback" };

  if (hasKeyword(msg, LEAD_KEYWORDS)) {
    return { mode: "lead" };
  }

  const glossaryMatch = findGlossaryMatch(msg);
  if (glossaryMatch) {
    return { mode: "glossary", glossaryMatch };
  }

  if (hasKeyword(msg, PROJECT_KEYWORDS)) {
    return { mode: "project" };
  }

  return { mode: "fallback" };
}

export function telemetryLog(event: string, data?: Record<string, unknown>) {
  if (typeof console !== "undefined" && console.log) {
    console.log("[FiberChat]", event, data ?? "");
  }
}
