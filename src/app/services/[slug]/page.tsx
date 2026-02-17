import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FtthLastMileDiagram } from "@/components/FtthLastMileDiagram";
import { getServiceBySlug, services } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <Link href="/services" className="text-accent font-medium hover:underline text-sm">
            ← Services
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{service.shortDescription}</p>
        </Section>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            {service.id === "ftth-fttp" && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 overflow-hidden">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  Typical topology: last-mile distribution &amp; drop
                </h2>
                <p className="text-sm text-slate-600 mb-4">
                  Schematic overview (original illustration). Feeder from central OLT to splitter; drops to premises (FTTH/FTTP).
                </p>
                <FtthLastMileDiagram className="w-full h-auto max-h-[280px]" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Scope</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {service.scope.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Methods</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {service.methods.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Deliverables</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {service.deliverables.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Typical clients</h2>
              <ul className="space-y-1 text-slate-600">
                {service.typicalClients.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
              <Button href="/contact" variant="primary" className="mt-6 w-full">
                Request RFQ
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
