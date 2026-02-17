/**
 * Mode-specific response handlers for Fiber Chat Assistant
 */

import { systemRules } from "@/data/systemRules";

export type ChatMode = "glossary" | "project" | "lead" | "fallback";

export function handleGlossary(term: string, definition: string, category: string): string {
  return `${term}: ${definition}`;
}

export function handleLead(): string {
  return "We do not provide pricing through chat. Please provide project details below so our team can review and respond.";
}

export function handleFallback(): string {
  return "I can assist with fiber infrastructure terminology or project guidance. Could you clarify your request?";
}

export function getProjectGuidancePrompt(userMessage: string): string {
  return `${systemRules.systemPrompt}

The user is asking about a project or installation scenario. Provide brief, professional guidance on:
- Appropriate construction method (HDD, trenching, aerial, etc.)
- Permitting and ROW considerations
- Safety considerations (811, OSHA, NESC)
- End with: "Would you like to submit project details for review?"

User message: ${userMessage}`;
}
