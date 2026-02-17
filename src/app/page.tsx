import Link from "next/link";
import { Cable, MapPin, User, Handshake } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { coverage } from "@/data/coverage";
import { homeShortVersion } from "@/data/internationalCooperation";
import { CoverageMap } from "@/components/CoverageMap";
import { PrequalCta } from "@/components/PrequalCta";
import { CapabilitiesDownloadLink } from "@/components/CapabilitiesDownloadLink";

export default function HomePage() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 sm:py-28">
        <Container>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-4xl leading-tight">
            Building America&apos;s Fiber Infrastructure — From Backbone to Broadband
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl">
            Underground & aerial, HDD, splicing & testing, restoration. For carriers, data centers, municipalities, and GCs.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg" className="bg-accent hover:bg-accent-light">
              Request RFQ
            </Button>
            <Button href="/contact#ops" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
              Speak to Ops
            </Button>
          </div>
          <div className="mt-14 pt-10 border-t border-white/20 max-w-2xl">
            <h2 className="text-xl font-semibold text-white">Built on 40+ Years of Field Leadership</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Since 1977, our founder has led outside plant and infrastructure operations across complex field environments. Today, Cloud Telecommunications continues that operational discipline — delivering safe, accountable, and performance-driven fiber infrastructure.
            </p>
            <p className="mt-4 text-slate-400 italic">— Terry Dickman</p>
          </div>
        </Container>
      </section>

      <Section className="bg-slate-50 border-b border-slate-200">
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge variant="accent">OSHA compliant</Badge>
          <Badge variant="accent">Municipal / carrier-grade</Badge>
          <Badge variant="accent">Underground & aerial</Badge>
          <Badge variant="accent">Backbone to FTTH</Badge>
          <Badge variant="accent">Closeout packages</Badge>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Services</h2>
        <p className="text-slate-600 max-w-2xl mb-10">
          Full-scope fiber construction from backbone and data center connectivity to FTTH and last-mile.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((s) => (
            <Card key={s.id} href={`/services/${s.slug}`}>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Cable className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.shortDescription}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/services" variant="outline">
            View all services
          </Button>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Coverage</h2>
            <p className="text-slate-600 mb-4">
              Nationwide project support where applicable.
            </p>
            <p className="text-sm text-slate-600">{coverage.mobilization}</p>
            <Button href="/coverage" variant="primary" className="mt-4">
              View coverage
            </Button>
          </div>
          <CoverageMap />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col sm:flex-row gap-6 items-start p-6 rounded-xl border border-slate-200 bg-white">
          <div className="rounded-lg bg-accent/10 p-3 shrink-0">
            <Handshake className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">International Technical Collaboration</h2>
            <p className="mt-2 text-slate-600">
              {homeShortVersion}
            </p>
            <Link
              href="/international-cooperation"
              className="mt-3 inline-block text-accent font-medium hover:underline"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="rounded-xl bg-slate-100 p-6 flex items-center justify-center w-24 h-24 shrink-0">
            <User className="h-10 w-10 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Leadership</h2>
            <p className="mt-2 font-medium text-slate-700">
              {company.leadership.name} — {company.leadership.title}
            </p>
            <p className="mt-2 text-slate-600">
              {company.leadership.experienceYears}+ years telecom infrastructure experience. {company.name} brings {company.experienceYears}+ years of operational fiber construction experience to every project.
            </p>
            <p className="mt-3 text-slate-600">{company.leadership.bio}</p>
            <div className="mt-4 flex gap-4">
              <Button href="/about" variant="outline" size="sm">
                About us
              </Button>
              <PrequalCta />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Capabilities Statement</h2>
          <p className="text-slate-600 mb-4">
            Our capabilities statement summarizes our scope, safety, and experience for carriers, municipalities, and GCs. Download a copy for your vendor files.
          </p>
          <CapabilitiesDownloadLink />
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <Container>
          <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-slate-300 mb-6">
            Request an RFQ or speak with our operations team to discuss your project.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-accent-light transition-colors"
            >
              Request RFQ
            </Link>
            <Link
              href="/contact#ops"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-medium text-white hover:bg-white hover:text-slate-900 transition-colors"
            >
              Speak to Ops
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
