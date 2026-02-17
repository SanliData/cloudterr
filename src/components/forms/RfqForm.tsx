"use client";

import { useState, FormEvent } from "react";
import { FormFieldInput, FormFieldSelect, FormFieldTextarea, FormFieldCheckbox } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { validateInput, sanitizePayload } from "@/lib/rfq";

const projectTypeOptions = [
  { value: "backbone", label: "Backbone / Long-Haul" },
  { value: "data-center", label: "Data Center Connectivity" },
  { value: "ftth", label: "FTTH/FTTP / Last-Mile" },
  { value: "aerial", label: "Aerial Construction" },
  { value: "underground", label: "Underground Construction" },
  { value: "splicing-testing", label: "Splicing, Testing & Turn-Up" },
  { value: "restoration", label: "Restoration & Closeout" },
  { value: "other", label: "Other" },
];

export function RfqForm() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const raw: Record<string, unknown> = {};
    data.forEach((value, key) => {
      if (key === "file") return;
      raw[key] = value instanceof File ? undefined : value;
    });
    const payload = sanitizePayload(raw);
    const { ok, errors: validationErrors } = validateInput(payload);
    if (!ok) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const body = { ...payload, website: (raw.website as string) ?? "" };

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        form.reset();
        setShowToast(true);
        setToastMessage("RFQ gönderildi. En kısa sürede size dönüş yapacağız.");
        return;
      }

      if (res.status === 400 && json.errors) {
        setErrors(json.errors);
        return;
      }

      if (res.status === 429) {
        setToastMessage(json.error || "Çok fazla istek. Lütfen birkaç dakika sonra tekrar deneyin.");
        setShowToast(true);
        return;
      }

      if (res.status === 403) {
        setToastMessage("Güvenlik nedeniyle işlem reddedildi.");
        setShowToast(true);
        return;
      }

      setToastMessage(json.error || "Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta ile ulaşın.");
      setShowToast(true);
    } catch {
      setToastMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
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
            label="Company"
            name="company"
            required
            error={errors.company}
            placeholder="Your company name"
          />
          <FormFieldInput
            label="Your Name"
            name="name"
            required
            error={errors.name}
            placeholder="Full name"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormFieldInput
            label="Email"
            name="email"
            type="email"
            required
            error={errors.email}
            placeholder="email@company.com"
          />
          <FormFieldInput
            label="Phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
          />
        </div>
        <FormFieldInput label="Role" name="role" placeholder="e.g. Project Manager" />
        <FormFieldSelect
          label="Project Type"
          name="projectType"
          options={projectTypeOptions}
        />
        <FormFieldInput label="Project Location" name="location" placeholder="City, State" />
        <FormFieldInput
          label="Target Start Date"
          name="startDate"
          type="text"
          placeholder="e.g. Q2 2025"
        />
        <FormFieldTextarea
          label="Scope / Description"
          name="scope"
          rows={4}
          placeholder="Brief description of project scope"
          maxLength={2000}
        />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            File Upload (optional)
          </label>
          <input
            type="file"
            name="file"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent/10 file:text-accent"
          />
          <p className="mt-1 text-xs text-slate-500">UI only — no backend upload.</p>
        </div>
        <FormFieldCheckbox
          label="I consent to being contacted about this request and to the use of my information per your privacy policy."
          name="consent"
          required
          error={errors.consent}
        />
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Gönderiliyor…" : "Submit RFQ"}
        </Button>
      </form>
      <Toast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </>
  );
}
