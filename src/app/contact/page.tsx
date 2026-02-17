import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { company } from "@/data/company";
import { RfqForm } from "@/components/forms/RfqForm";

export const metadata: Metadata = {
  title: "Contact / RFQ",
  description: "Contact Cloud Communication LLC. Submit an RFQ or reach our operations team. Dallas/DFW, Texas.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact / RFQ</h1>
          <p className="mt-4 text-lg text-slate-600">
            Submit a request for quote or reach our team. We respond to RFQs and calls during business hours.
          </p>
        </Section>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Office</h2>
              <p className="mt-1 text-slate-600">{company.contact.address}</p>
              <p className="mt-1 text-slate-600">{company.contact.phone}</p>
              <p className="mt-1 text-slate-600">{company.contact.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Business hours</h2>
              <p className="mt-1 text-slate-600">{company.contact.hours}</p>
              <p className="mt-2 text-sm text-slate-500">
                {company.contact.schedulingNote}
              </p>
            </div>
            <div id="ops">
              <h2 className="text-lg font-semibold text-slate-900">Speak to Ops</h2>
              <p className="mt-1 text-slate-600">
                Call or email to schedule a call with our operations team. We can discuss scope, schedule, and mobilization.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Submit RFQ</h2>
            <RfqForm />
          </div>
        </div>
      </Section>
    </>
  );
}
