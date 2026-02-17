"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PrequalForm } from "@/components/forms/PrequalForm";

export function PrequalCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Request Prequalification Package
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Request Prequalification Package"
      >
        <PrequalForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
