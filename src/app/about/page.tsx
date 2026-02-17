import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { PrequalCta } from "@/components/PrequalCta";

export const metadata: Metadata = {
  title: "About",
  description: `About Cloud Communication LLC — ${company.experienceYears}+ years fiber infrastructure experience. Leadership, mission, and values.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">About Us</h1>
          <p className="mt-4 text-lg text-slate-600">
            {company.name} is a US-based fiber infrastructure contractor. We deliver from backbone and middle-mile to FTTH/FTTP and last-mile — for carriers, data centers, municipalities, and general contractors.
          </p>
        </Section>
      </section>

      <Section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Mission & Approach</h2>
        <p className="text-slate-600 max-w-3xl">
          We focus on safe, compliant, and well-documented fiber construction. Our approach emphasizes schedule discipline, ROW and 811 compliance, restoration, and long-term asset durability. We work as an extension of your team with clear communication and closeout packages that meet carrier and municipal standards.
        </p>
      </Section>

      <Section className="bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Leadership</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-full bg-accent/20 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold text-slate-900 text-lg">
              {company.leadership.name}
            </p>
            <p className="text-accent font-medium">{company.leadership.title}</p>
            <p className="mt-2 text-slate-600">
              {company.leadership.experienceYears}+ years of telecom infrastructure experience.
            </p>
            <p className="mt-3 text-slate-600">{company.leadership.bio}</p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Company Experience</h2>
        <p className="text-slate-600 max-w-3xl">
          {company.name} brings {company.experienceYears}+ years of operational fiber construction experience to every project. Our crews and project teams have built backbone, data center, FTTH, and municipal networks across Texas and beyond. We mobilize for statewide deployments and support nationwide projects where applicable.
        </p>
      </Section>

      <Section className="bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Values</h2>
        <ul className="space-y-2 max-w-2xl">
          {company.values.map((v, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-700">
              <span className="text-accent mt-0.5">•</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Next steps</h2>
        <p className="text-slate-600 mb-6">
          Request our prequalification package for your vendor files, or contact us to discuss your project.
        </p>
        <div className="flex flex-wrap gap-4">
          <PrequalCta />
          <Button href="/contact" variant="primary">
            Contact us
          </Button>
        </div>
      </Section>
    </>
  );
}
