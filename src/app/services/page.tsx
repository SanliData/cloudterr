import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Fiber infrastructure services: backbone, data center, FTTH/FTTP, aerial, underground, splicing & testing, restoration & closeout.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Services</h1>
          <p className="mt-4 text-lg text-slate-600">
            Full-scope fiber construction from backbone and long-haul to FTTH and last-mile. Each service has a dedicated page with scope, methods, deliverables, and typical clients.
          </p>
        </Section>
      </section>

      <Section>
        <div className="space-y-8">
          {services.map((s) => (
            <Card key={s.id} className="!shadow-none border-t border-slate-200 rounded-none first:border-t-0">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="relative shrink-0 w-full sm:w-64 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 16rem"
                  />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 min-w-0">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
                    <p className="mt-2 text-slate-600">{s.shortDescription}</p>
                  </div>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-accent font-medium hover:underline shrink-0"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
