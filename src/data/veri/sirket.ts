/**
 * Şirket verileri — marka ve iletişim ile uyumlu.
 */
import { marka } from "./marka";

export const sirket = {
  ...marka,
  tagline: "Fiber Infrastructure & Construction",
  description:
    "US-based fiber infrastructure contractor. From backbone and middle-mile to FTTH/FTTP and last-mile. Nationwide project support.",
  experienceYears: 35,
  values: [
    "Safety-first culture and OSHA compliance",
    "811 and municipal ROW compliance",
    "Documentation and closeout packages",
    "Restoration and long-term durability",
    "Carrier and municipal-grade quality",
  ],
  contact: {
    phone: "(555) 123-4567",
    email: "info@cloudtelc.com",
    address: "",
    hours: "Mon–Fri 7:00 AM – 6:00 PM CT",
    schedulingNote:
      "4–6 PM reserved for school pickup; otherwise flexible scheduling for calls.",
  },
} as const;
