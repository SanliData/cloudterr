"use client";

import { useState, FormEvent } from "react";
import { FormFieldInput, FormFieldSelect, FormFieldTextarea, FormFieldCheckbox } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string | File | undefined> = {};
    data.forEach((value, key) => {
      payload[key] = value instanceof File ? value : (value as string);
    });
    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!payload.company?.toString().trim()) newErrors.company = "Company is required.";
    if (!payload.name?.toString().trim()) newErrors.name = "Name is required.";
    if (!payload.email?.toString().trim()) newErrors.email = "Email is required.";
    const email = payload.email?.toString();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email.";
    if (!payload.consent) newErrors.consent = "Consent is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log("RFQ Form Data (JSON):", JSON.stringify(Object.fromEntries(data.entries()), null, 2));
    form.reset();
    setShowToast(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit" variant="primary" size="lg">
          Submit RFQ
        </Button>
      </form>
      <Toast show={showToast} onClose={() => setShowToast(false)} message="RFQ submitted. We'll be in touch." />
    </>
  );
}
