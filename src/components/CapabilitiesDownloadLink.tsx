"use client";

import { FileText } from "lucide-react";

export function CapabilitiesDownloadLink() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
      onClick={(e) => e.preventDefault()}
    >
      <FileText className="h-4 w-4" />
      Download Capabilities Statement (PDF placeholder)
    </a>
  );
}
