import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CoverageMap } from "@/components/CoverageMap";
import { coverage } from "@/data/coverage";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Cloud Communication LLC service areas: DFW, North Texas, Texas expansion. Crews available for statewide deployments.",
};

export default function CoveragePage() {
  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Coverage</h1>
          <p className="mt-4 text-lg text-slate-600">
            Primary operations in DFW and North Texas; Texas expansion and nationwide project support where applicable.
          </p>
        </Section>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CoverageMap />
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              {coverage.primary.label}
            </h2>
            <p className="text-slate-600 mb-2">Counties:</p>
            <p className="text-slate-600">{coverage.primary.counties.join(", ")}</p>
            <p className="text-slate-600 mt-4 mb-2">Major cities:</p>
            <p className="text-slate-600">{coverage.primary.cities.join(", ")}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          {coverage.texas.label}
        </h2>
        <ul className="space-y-1 text-slate-600">
          {coverage.texas.areas.map((area, i) => (
            <li key={i}>• {area}</li>
          ))}
        </ul>
        <p className="mt-6 text-slate-600">{coverage.mobilization}</p>
        <Button href="/contact" variant="primary" className="mt-6">
          Schedule a call
        </Button>
      </Section>
    </>
  );
}
