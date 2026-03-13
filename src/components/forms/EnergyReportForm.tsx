"use client";

import { useState, FormEvent } from "react";
import { FormFieldInput, FormFieldCheckbox } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import {
  validateEnergyReport,
  sanitizeEnergyReport,
} from "@/lib/lead";
import { useTranslations } from "next-intl";

export function EnergyReportForm() {
  const t = useTranslations("EnergyReport");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const raw: Record<string, unknown> = { leadType: "energy-report" };
    data.forEach((value, key) => {
      if (key === "website") return;
      raw[key] = value instanceof File ? undefined : value;
    });
    const payload = sanitizeEnergyReport(raw);
    const { ok, errors: validationErrors } = validateEnergyReport(payload);
    if (!ok) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const body = { ...payload, leadType: "energy-report", website: (raw.website as string) ?? "" };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        form.reset();
        setShowToast(true);
        setToastMessage(t("submitSuccess"));
        return;
      }

      if (res.status === 400 && json.errors) {
        setErrors(json.errors);
        return;
      }

      if (res.status === 429) {
        setToastMessage(json.error || t("submitRateLimit"));
        setShowToast(true);
        return;
      }

      setToastMessage(json.error || t("submitError"));
      setShowToast(true);
    } catch {
      setToastMessage(t("submitError"));
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
          aria-hidden
        />
        <FormFieldInput
          label={t("formCompanyName")}
          name="companyName"
          required
          error={errors.companyName}
          placeholder={t("formCompanyNamePlaceholder")}
        />
        <FormFieldInput
          label={t("formDataCenterLocation")}
          name="dataCenterLocation"
          required
          error={errors.dataCenterLocation}
          placeholder={t("formDataCenterLocationPlaceholder")}
        />
        <FormFieldInput
          label={t("formFacilitySizeMw")}
          name="facilitySizeMw"
          error={errors.facilitySizeMw}
          placeholder={t("formFacilitySizeMwPlaceholder")}
        />
        <FormFieldInput
          label={t("formCurrentCoolingSystem")}
          name="currentCoolingSystem"
          error={errors.currentCoolingSystem}
          placeholder={t("formCurrentCoolingSystemPlaceholder")}
        />
        <FormFieldInput
          label={t("formContactEmail")}
          name="contactEmail"
          type="email"
          required
          error={errors.contactEmail}
          placeholder="email@company.com"
        />
        <FormFieldCheckbox
          label={t("formConsent")}
          name="consent"
          required
          error={errors.consent}
        />
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? t("submitting") : t("submitButton")}
        </Button>
      </form>
      <Toast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </>
  );
}
