"use client";

import { useState, FormEvent } from "react";
import {
  FormFieldInput,
  FormFieldTextarea,
  FormFieldCheckbox,
} from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import {
  validateBrokerPartnership,
  sanitizeBrokerPartnership,
} from "@/lib/lead";
import { useTranslations } from "next-intl";

export function BrokerPartnershipForm() {
  const t = useTranslations("BrokerPartnership");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const raw: Record<string, unknown> = { leadType: "broker-partnership" };
    data.forEach((value, key) => {
      if (key === "website") return;
      raw[key] = value instanceof File ? undefined : value;
    });
    const payload = sanitizeBrokerPartnership(raw);
    const { ok, errors: validationErrors } = validateBrokerPartnership(payload);
    if (!ok) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const body = { ...payload, leadType: "broker-partnership", website: (raw.website as string) ?? "" };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldInput
            label={t("formName")}
            name="name"
            required
            error={errors.name}
            placeholder={t("formNamePlaceholder")}
          />
          <FormFieldInput
            label={t("formEmail")}
            name="email"
            type="email"
            required
            error={errors.email}
            placeholder="email@example.com"
          />
        </div>
        <FormFieldInput
          label={t("formPhone")}
          name="phone"
          type="tel"
          error={errors.phone}
          placeholder="(555) 123-4567"
        />
        <FormFieldInput
          label={t("formCompany")}
          name="company"
          error={errors.company}
          placeholder={t("formCompanyPlaceholder")}
        />
        <FormFieldTextarea
          label={t("formMessage")}
          name="message"
          rows={4}
          error={errors.message}
          placeholder={t("formMessagePlaceholder")}
          maxLength={2000}
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
