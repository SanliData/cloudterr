"use client";

import { useState, FormEvent } from "react";
import { FormFieldInput, FormFieldSelect, FormFieldTextarea } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

const roleOptions = [
  { value: "foreman", label: "Foreman" },
  { value: "hdd-operator", label: "HDD Operator" },
  { value: "fiber-splicer", label: "Fiber Splicer" },
  { value: "locator", label: "Locator" },
  { value: "crew-lead", label: "Crew Lead" },
  { value: "other", label: "Other" },
];

export function CareerForm() {
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log("Career/Subcontractor application:", Object.fromEntries(data.entries()));
    form.reset();
    setShowToast(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormFieldInput label="Full Name" name="name" required error={errors.name} />
        <FormFieldInput label="Email" name="email" type="email" required error={errors.email} />
        <FormFieldInput label="Phone" name="phone" type="tel" />
        <FormFieldSelect label="Interest (Role / Type)" name="role" options={roleOptions} />
        <FormFieldTextarea label="Experience / Notes" name="notes" rows={3} />
        <Button type="submit" variant="primary" size="md">
          Submit Application
        </Button>
      </form>
      <Toast show={showToast} onClose={() => setShowToast(false)} message="Application received. We'll be in touch." />
    </>
  );
}
