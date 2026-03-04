import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { PrequalCta } from "@/components/PrequalCta";
import { Timeline } from "@/components/Timeline";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/about`;
  return buildMetadata({
    title: "About",
    description: `About ${company.name} — ${company.experienceYears}+ years fiber infrastructure experience. Leadership, mission, and values.`,
    path,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{t("title")}</h1>
          <p className="mt-4 text-lg text-slate-600">
            {t("intro", { name: company.name })}
          </p>
        </Section>
      </section>

      <Section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("missionTitle")}</h2>
        <p className="text-slate-600 max-w-3xl">
          {t("missionText")}
        </p>
      </Section>

      <Section className="bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t("leadershipTitle")}</h2>
        <p className={`text-slate-600 ${company.leadership.email ? "mb-2" : "mb-6"}`}>
          {t("leadershipSubtitle", {
            name: company.leadership.name,
            title: company.leadership.title,
            years: company.leadership.experienceYears,
          })}
        </p>
        {company.leadership.email && (
          <p className="text-slate-600 mb-6">
            <a href={`mailto:${company.leadership.email}`} className="text-accent hover:underline">
              {company.leadership.email}
            </a>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-accent/20 shrink-0" aria-hidden />
          <p className="text-slate-600 max-w-2xl">{company.leadership.bio}</p>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t("timelineTitle")}</h3>
        <Timeline />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("experienceTitle")}</h2>
        <p className="text-slate-600 max-w-3xl">
          {t("experienceText", { name: company.name, years: company.experienceYears })}
        </p>
      </Section>

      <Section className="bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("valuesTitle")}</h2>
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
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("nextStepsTitle")}</h2>
        <p className="text-slate-600 mb-6">
          {t("nextStepsText")}
        </p>
        <div className="flex flex-wrap gap-4">
          <PrequalCta />
          <Button href="/contact" variant="primary">
            {t("contactUs")}
          </Button>
        </div>
      </Section>
    </>
  );
}
