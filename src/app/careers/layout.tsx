import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers / Subcontractors",
  description:
    "Join Cloud Communication LLC. W2 careers and subcontractor opportunities. Foreman, HDD operator, splicer, locator, crew lead.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
