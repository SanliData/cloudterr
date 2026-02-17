"use client";

import { useState, FormEvent } from "react";
import { FormFieldInput } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export function PrequalForm({ onSuccess }: { onSuccess?: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const company = data.get("company")?.toString().trim();
    const role = data.get("role")?.toString().trim();
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log("Prequalification request:", { name, email, company, role });
    form.reset();
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormFieldInput
        label="Name"
        name="name"
        required
        error={errors.name}
        placeholder="Full name"
      />
      <FormFieldInput
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email}
        placeholder="email@company.com"
      />
      <FormFieldInput label="Company" name="company" placeholder="Company name" />
      <FormFieldInput label="Role" name="role" placeholder="e.g. Procurement" />
      <Button type="submit" variant="primary" size="md">
        Request Package
      </Button>
    </form>
  );
}
