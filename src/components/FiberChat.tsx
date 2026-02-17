"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextarea,
} from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { telemetryLog } from "@/lib/classifier";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  badge?: string | null;
};

const PROJECT_TYPES = [
  { value: "", label: "Select project type..." },
  { value: "backbone", label: "Backbone / Long-Haul" },
  { value: "data-center", label: "Data Center Connectivity" },
  { value: "ftth", label: "FTTH/FTTP / Last-Mile" },
  { value: "aerial", label: "Aerial Construction" },
  { value: "underground", label: "Underground Construction" },
  { value: "splicing-testing", label: "Splicing, Testing & Turn-Up" },
  { value: "restoration", label: "Restoration & Closeout" },
  { value: "other", label: "Other" },
];

export function FiberChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRfqForm, setShowRfqForm] = useState(false);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqErrors, setRfqErrors] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "I can help with fiber infrastructure terminology and project guidance. Ask about terms like HDD, FTTH, or describe your installation scenario.",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: text },
    ]);
    setLoading(true);
    setShowRfqForm(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data.reply || "Please contact our operations team.";
      const badge = data.badge ?? null;

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: reply,
          badge,
        },
      ]);

      if (data.showRfqForm) {
        setShowRfqForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "Please consult a licensed engineer or contact our operations team.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleRfqSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => {
      payload[k] = String(v);
    });

    const errs: Record<string, string> = {};
    if (!payload.company?.trim()) errs.company = "Company is required.";
    if (!payload.contactName?.trim()) errs.contactName = "Contact name is required.";
    if (!payload.email?.trim()) errs.email = "Email is required.";
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      errs.email = "Enter a valid email.";
    }
    if (!payload.phone?.trim()) errs.phone = "Phone is required.";
    if (!payload.projectType) errs.projectType = "Project type is required.";
    if (!payload.projectScope?.trim()) errs.projectScope = "Project scope is required.";

    if (Object.keys(errs).length > 0) {
      setRfqErrors(errs);
      return;
    }

    setRfqErrors({});
    console.log("[FiberChat] RFQ submission:", JSON.stringify(payload, null, 2));
    telemetryLog("rfq_submission", payload);
    form.reset();
    setRfqSubmitted(true);
    setShowRfqForm(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "Thank you. We have received your project details and will respond shortly.",
      },
    ]);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 min-h-[48px] text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Ask a Fiber Expert"
      >
        <MessageCircle className="h-5 w-5 shrink-0" />
        <span className="font-medium hidden sm:inline">Ask a Fiber Expert</span>
      </button>

      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 shrink-0">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 truncate pr-2">
              Fiber Infrastructure Assistant
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 shrink-0"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[95%] sm:max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {m.badge && (
                    <span className="mb-1 block text-xs font-medium text-accent">
                      [{m.badge}]
                    </span>
                  )}
                  <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <span className="text-sm text-slate-600">Thinking...</span>
                </div>
              </div>
            )}

            {showRfqForm && !rfqSubmitted && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Project Details
                </h3>
                <form onSubmit={handleRfqSubmit} className="space-y-3">
                  <FormFieldInput
                    label="Company"
                    name="company"
                    required
                    error={rfqErrors.company}
                    placeholder="Company name"
                  />
                  <FormFieldInput
                    label="Contact Name"
                    name="contactName"
                    required
                    error={rfqErrors.contactName}
                    placeholder="Full name"
                  />
                  <FormFieldInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    error={rfqErrors.email}
                    placeholder="email@company.com"
                  />
                  <FormFieldInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    required
                    error={rfqErrors.phone}
                    placeholder="Phone number"
                  />
                  <FormFieldInput
                    label="Project Location"
                    name="projectLocation"
                    placeholder="City, State"
                  />
                  <FormFieldSelect
                    label="Project Type"
                    name="projectType"
                    required
                    options={PROJECT_TYPES}
                    error={rfqErrors.projectType}
                  />
                  <FormFieldInput
                    label="Timeline"
                    name="timeline"
                    placeholder="e.g. Q2 2025"
                  />
                  <FormFieldTextarea
                    label="Project Scope"
                    name="projectScope"
                    required
                    rows={4}
                    error={rfqErrors.projectScope}
                    placeholder="Describe your project..."
                  />
                  <Button type="submit" variant="primary" size="sm">
                    Submit
                  </Button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="border-t border-slate-200 p-4"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fiber terms or projects..."
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                disabled={loading}
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-lg bg-accent px-4 py-2.5 text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
