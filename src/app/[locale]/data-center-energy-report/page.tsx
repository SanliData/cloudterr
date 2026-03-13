import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { EnergyReportForm } from "@/components/forms/EnergyReportForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("EnergyReport");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: `/${locale}/data-center-energy-report`,
  });
}

export default async function DataCenterEnergyReportPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("EnergyReport");

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{t("heroTitle")}</h1>
          <p className="mt-4 text-lg text-slate-600">{t("heroSubtitle")}</p>
          <Button href="#form" variant="primary" size="lg" className="mt-6">
            {t("cta")}
          </Button>
        </Section>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{t("whatWeAnalyzeTitle")}</h2>
            <ul className="space-y-2 text-slate-600 mb-8" role="list">
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("analyze1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("analyze2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("analyze3")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("analyze4")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("analyze5")}
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t("whatYouReceiveTitle")}</h2>
            <p className="text-slate-600">{t("whatYouReceiveText")}</p>
          </div>
          <div id="form" className="lg:col-span-1 scroll-mt-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">{t("cta")}</h2>
              <EnergyReportForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
