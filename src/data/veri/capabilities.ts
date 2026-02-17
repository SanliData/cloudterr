/**
 * Capabilities Statement — federal procurement style.
 * Entity: Cloud Telecommunications.
 */

export const companyOverview =
  "Cloud Telecommunications is a Texas-based company providing outside plant (OSP) and fiber infrastructure field operations support. Leadership experience dates back to 1977, beginning with direct Outside Plant (OSP) supervision and continuing through over four decades of complex field operations across telecommunications and energy environments. The company is founder-led and field-driven.";

export const coreCompetencies = [
  "Outside Plant (OSP) Construction & Supervision",
  "Fiber Infrastructure Deployment",
  "Field Operations Leadership",
  "Contractor & Vendor Oversight",
  "Safety & Regulatory Compliance",
  "Budget & Schedule Control",
  "Infrastructure Project Coordination",
] as const;

export const differentiators = [
  "40+ Years Field-Based Infrastructure Leadership",
  "Founder-Led Operational Oversight",
  "Safety-First Execution Model",
  "Lean, Responsive Organizational Structure",
  "Proven Performance in Complex Field Environments",
] as const;

export const leadership = {
  name: "Terry Dickman",
  title: "General Manager / Founder",
  summary:
    "Terry Dickman began his telecommunications infrastructure career in 1977 as an Outside Plant Superintendent overseeing cable installation, network expansion, and field operations. Over the following decades, he led large-scale field operations across telecommunications and energy sectors, maintaining a consistent focus on safety, contractor management, and disciplined project execution. Cloud Telecommunications represents the continuation of this field-proven infrastructure leadership.",
} as const;

export const companyData = {
  legalName: "Cloud Telecommunications",
  operatingBrand: "Cloud Telecommunications",
  state: "Texas",
  leadershipExperience: "40+ Years",
  naics: [
    {
      code: "237130",
      label: "Power and Communication Line and Related Structures Construction",
    },
    {
      code: "238210",
      label: "Electrical Contractors and Other Wiring Installation Contractors",
    },
  ] as const,
  uei: "[Placeholder]",
  cage: "[Placeholder]",
} as const;
