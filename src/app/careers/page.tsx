"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CareerForm } from "@/components/forms/CareerForm";

const roles = [
  "Foreman",
  "HDD Operator",
  "Fiber Splicer",
  "Locator",
  "Crew Lead",
];

const subcontractorChecklist = [
  "Insurance (general liability, workers comp) per project requirements",
  "Safety orientation and OSHA awareness",
  "Documentation: W-9, insurance certificates, safety docs",
  "Scope and rate agreement before mobilization",
];

export default function CareersPage() {
  const [tab, setTab] = useState<"careers" | "subcontractors">("careers");

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Careers / Subcontractors
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Join our team as a W2 hire or partner as a subcontractor. We’re building fiber infrastructure nationwide.
          </p>
        </Section>
      </section>

      <Section>
        <div className="flex border-b border-slate-200 mb-8">
          <button
            type="button"
            onClick={() => setTab("careers")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              tab === "careers"
                ? "border-accent text-accent"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Careers
          </button>
          <button
            type="button"
            onClick={() => setTab("subcontractors")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              tab === "subcontractors"
                ? "border-accent text-accent"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Subcontractor Opportunities
          </button>
        </div>

        {tab === "careers" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Open roles</h2>
              <p className="text-slate-600 mb-4">
                We hire foremen, HDD operators, fiber splicers, locators, and crew leads. Full-time and project-based positions.
              </p>
              <ul className="space-y-1 text-slate-700">
                {roles.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </div>
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Apply</h2>
              <CareerForm />
            </Card>
          </div>
        )}

        {tab === "subcontractors" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                Subcontractor onboarding
              </h2>
              <p className="text-slate-600 mb-4">
                We work with qualified subcontractors for fiber construction, splicing, and restoration. Requirements and documentation checklist:
              </p>
              <ul className="space-y-2 text-slate-700">
                {subcontractorChecklist.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Subcontractor application
              </h2>
              <CareerForm />
            </Card>
          </div>
        )}
      </Section>
    </>
  );
}
