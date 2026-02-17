import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getProjectBySlug, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <Link href="/projects" className="text-accent font-medium hover:underline text-sm">
            ← Projects
          </Link>
          <Badge variant="accent" className="mt-2 inline-block">
            {project.projectType}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            {project.title}
          </h1>
          <p className="mt-2 text-slate-500">
            {project.clientType} · {project.location}
          </p>
          <p className="mt-4 text-lg text-slate-600">{project.shortDescription}</p>
        </Section>
      </section>

      <Section>
        <div className="max-w-3xl space-y-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Overview</h2>
            <p className="text-slate-600">{project.overview}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Scope</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {project.scope.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Approach</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {project.approach.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Deliverables</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {project.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Safety</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {project.safety.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Typical phases</h2>
            <ul className="space-y-2 text-slate-600">
              {project.timeline.map((t, i) => (
                <li key={i}>
                  <strong>{t.phase}:</strong> {t.description}
                </li>
              ))}
            </ul>
          </div>
          <Button href="/contact" variant="primary">
            Request RFQ
          </Button>
        </div>
      </Section>
    </>
  );
}
