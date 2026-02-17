"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { projects, projectTypes, type ProjectType } from "@/data/projects";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectType | "All">("All");
  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.projectType === filter);
  }, [filter]);

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Projects</h1>
          <p className="mt-4 text-lg text-slate-600">
            Sample case studies. Real project types and scope; client names are generalized (Tier-1 Carrier, Regional ISP, Municipality, Hyperscale Data Center).
          </p>
        </Section>
      </section>

      <Section>
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setFilter("All")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === "All"
                ? "bg-accent text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === type
                  ? "bg-accent text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} href={`/projects/${p.slug}`}>
              <div className="relative -m-6 mb-4 -mt-6 aspect-video w-[calc(100%+3rem)] overflow-hidden rounded-t-xl">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Badge variant="accent" className="mb-2">
                {p.projectType}
              </Badge>
              <h2 className="text-lg font-bold text-slate-900">{p.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{p.clientType} · {p.location}</p>
              <p className="mt-2 text-sm text-slate-600">{p.shortDescription}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
