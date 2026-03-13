"use client";

import { useState, FormEvent } from "react";
import { FormFieldInput, FormFieldCheckbox } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { validateLandEvaluation, sanitizeLandEvaluation } from "@/lib/lead";
import { useTranslations } from "next-intl";

export function LandEvaluationForm() {
  const t = useTranslations("LandEvaluation");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const raw: Record<string, unknown> = { leadType: "land-evaluation" };
    data.forEach((value, key) => {
      if (key === "website" || key === "file") return;
      raw[key] = value instanceof File ? undefined : value;
    });
    const payload = sanitizeLandEvaluation(raw);
    const { ok, errors: validationErrors } = validateLandEvaluation(payload);
    if (!ok) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const body = { ...payload, leadType: "land-evaluation", website: (raw.website as string) ?? "" };
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
        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }} aria-hidden />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldInput label={t("formName")} name="name" required error={errors.name} placeholder={t("formNamePlaceholder")} />
          <FormFieldInput label={t("formEmail")} name="email" type="email" required error={errors.email} placeholder="email@example.com" />
        </div>
        <FormFieldInput label={t("formPhone")} name="phone" type="tel" error={errors.phone} placeholder="(555) 123-4567" />
        <FormFieldInput label={t("formLandLocation")} name="landLocation" required error={errors.landLocation} placeholder={t("formLandLocationPlaceholder")} />
        <FormFieldInput label={t("formLandSize")} name="landSize" required error={errors.landSize} placeholder={t("formLandSizePlaceholder")} />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("formUploadMap")}</label>
          <input type="file" name="file" accept="image/*,.pdf" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent/10 file:text-accent" />
          <p className="mt-1 text-xs text-slate-500">{t("formUploadMapHint")}</p>
        </div>
        <FormFieldCheckbox label={t("formConsent")} name="consent" required error={errors.consent} />
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? t("submitting") : t("submitButton")}
        </Button>
      </form>
      <Toast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </>
  );
}
