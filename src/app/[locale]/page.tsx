import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Cable, User, Handshake } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { CoverageMap } from "@/components/CoverageMap";
import { PrequalCta } from "@/components/PrequalCta";
import { CapabilitiesDownloadLink } from "@/components/CapabilitiesDownloadLink";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const tServices = await getTranslations("Services");
  const tBanner = await getTranslations("LeadBanner");

  return (
    <>
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 sm:py-28">
        <Container>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-4xl leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl">
            {t("heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg" className="bg-accent hover:bg-accent-light">
              {tCommon("requestRfq")}
            </Button>
            <Button href="/contact#ops" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
              {tCommon("speakToOps")}
            </Button>
          </div>
          <div className="mt-14 pt-10 border-t border-white/20 max-w-2xl">
            <h2 className="text-xl font-semibold text-white">{t("leadershipHeading")}</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">
              {t("leadershipText")}
            </p>
            <p className="mt-4 text-slate-400 italic">{t("terryQuote")}</p>
          </div>
        </Container>
      </section>

      <Section className="bg-accent/10 border-b border-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{tBanner("title")}</h2>
          <p className="mt-3 text-slate-700">{tBanner("subtitle")}</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button href="/land-evaluation" variant="primary" size="lg" className="bg-accent hover:bg-accent/90 text-white">
              {tBanner("ctaLand")}
            </Button>
            <Button href="/broker-partnership" variant="outline" size="lg" className="border-slate-700 text-slate-800 hover:bg-slate-200">
              {tBanner("ctaBroker")}
            </Button>
            <Button href="/data-center-energy-report" variant="outline" size="lg" className="border-slate-700 text-slate-800 hover:bg-slate-200">
              {tBanner("ctaEnergy")}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 border-b border-slate-200">
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge variant="accent">{t("badgeOsha")}</Badge>
          <Badge variant="accent">{t("badgeMunicipal")}</Badge>
          <Badge variant="accent">{t("badgeUnderground")}</Badge>
          <Badge variant="accent">{t("badgeBackbone")}</Badge>
          <Badge variant="accent">{t("badgeCloseout")}</Badge>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{t("servicesTitle")}</h2>
        <p className="text-slate-600 max-w-2xl mb-10">
          {t("servicesIntro")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((s) => (
            <Card key={s.id} href={`/services/${s.slug}`}>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Cable className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{tServices(`${s.slug}.title`)}</h3>
                  <p className="mt-1 text-sm text-slate-600">{tServices(`${s.slug}.shortDescription`)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/services" variant="outline">
            {tCommon("viewAllServices")}
          </Button>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{t("coverageTitle")}</h2>
            <p className="text-slate-600 mb-4">
              {t("coverageIntro")}
            </p>
            <p className="text-sm text-slate-600">{t("coverageMobilization")}</p>
            <Button href="/coverage" variant="primary" className="mt-4">
              {tCommon("viewCoverage")}
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
            <h2 className="text-xl font-bold text-slate-900">{t("internationalTitle")}</h2>
            <p className="mt-2 text-slate-600">
              {t("internationalIntro")}
            </p>
            <Link
              href="/international-cooperation"
              className="mt-3 inline-block text-accent font-medium hover:underline"
            >
              {tCommon("learnMore")} →
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
            <h2 className="text-2xl font-bold text-slate-900">{t("leadershipTitle")}</h2>
            <p className="mt-2 font-medium text-slate-700">
              {company.leadership.name} — {company.leadership.title}
            </p>
            <p className="mt-2 text-slate-600">
              {t("leadershipYears", { years: company.leadership.experienceYears })}{" "}
              {t("leadershipCompanyYears", { name: company.name, experienceYears: company.experienceYears })}
            </p>
            <p className="mt-3 text-slate-600">{company.leadership.bio}</p>
            <div className="mt-4 flex gap-4">
              <Button href="/about" variant="outline" size="sm">
                {tCommon("aboutUs")}
              </Button>
              <PrequalCta />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t("capabilitiesTitle")}</h2>
          <p className="text-slate-600 mb-4">
            {t("capabilitiesIntro")}
          </p>
          <CapabilitiesDownloadLink />
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <Container>
          <h2 className="text-2xl font-bold mb-2">{t("ctaTitle")}</h2>
          <p className="text-slate-300 mb-6">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-accent-light transition-colors"
            >
              {tCommon("requestRfq")}
            </Link>
            <Link
              href="/contact#ops"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-medium text-white hover:bg-white hover:text-slate-900 transition-colors"
            >
              {tCommon("speakToOps")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
