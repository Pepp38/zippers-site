// src/components/support/SupportModal.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSupport } from "./useSupport";

type SupportFormState = {
  replyToEmail: string;
  subjectText: string;
  messageText: string;
};

type SupportSendResult =
  | { ok: true }
  | { ok: false; errorMessage: string };

function normalizeEmail(emailRaw: string): string {
  return emailRaw.trim();
}

function isEmailLikelyValid(emailRaw: string): boolean {
  const email = normalizeEmail(emailRaw);
  if (email.length < 6) return false;
  // Intentionally simple: avoids rejecting valid-but-weird emails.
  return email.includes("@") && email.includes(".");
}

function buildMailtoUrl(args: {
  toEmail: string;
  subjectText: string;
  messageText: string;
}): string {
  const params = new URLSearchParams();
  params.set("subject", args.subjectText);
  params.set("body", args.messageText);
  return `mailto:${encodeURIComponent(args.toEmail)}?${params.toString()}`;
}

export function SupportModal() {
  const { isOpen, closeSupport, prefill } = useSupport();

  const supportToEmail = "plc.creates@proton.me";

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<SupportFormState>({
    replyToEmail: "",
    subjectText: "",
    messageText: "",
  });

  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "sending" }
    | { status: "sent" }
    | { status: "error"; errorMessage: string }
  >({ status: "idle" });

  const pagePath = prefill?.pagePath ?? (typeof window !== "undefined" ? window.location.pathname : "");
  const defaultSubject = useMemo(() => prefill?.subject ?? "Support request", [prefill?.subject]);

  useEffect(() => {
    if (!isOpen) return;

    setSubmitState({ status: "idle" });
    setForm((prev) => ({
      ...prev,
      subjectText: defaultSubject,
      messageText: prefill?.message ?? "",
    }));

    // Focus the first field after paint.
    window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 0);
  }, [isOpen, defaultSubject, prefill?.message]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSupport();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeSupport]);

  const canSubmit =
    isEmailLikelyValid(form.replyToEmail) &&
    form.messageText.trim().length >= 10 &&
    submitState.status !== "sending";

  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    // Only close if the click is on the backdrop (not inside dialog).
    if (e.target === e.currentTarget) closeSupport();
  }

  function setField<K extends keyof SupportFormState>(key: K, value: SupportFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function sendSupportMessage(): Promise<SupportSendResult> {
    // P0 implementation: mailto fallback.
    // This opens the user's email client with a prefilled message.
    // Later we can replace this with zippers-api POST /support.
    const replyToEmail = normalizeEmail(form.replyToEmail);
    const subjectText = form.subjectText.trim().length ? form.subjectText.trim() : defaultSubject;

    const lines: string[] = [];
    lines.push(form.messageText.trim());
    lines.push("");
    lines.push("—");
    lines.push(`From: ${replyToEmail}`);
    if (pagePath) lines.push(`Page: ${pagePath}`);

    const mailto = buildMailtoUrl({
      toEmail: supportToEmail,
      subjectText,
      messageText: lines.join("\n"),
    });

    try {
      window.location.href = mailto;
      return { ok: true };
    } catch {
      return { ok: false, errorMessage: "Could not open your email client. Please try again." };
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitState({ status: "sending" });
    const result = await sendSupportMessage();

    if (result.ok) {
      setSubmitState({ status: "sent" });
    } else {
      setSubmitState({ status: "error", errorMessage: result.errorMessage });
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onMouseDown={onBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/10 px-6 py-4">
          <div>
            <div className="text-lg font-semibold text-slate-900">Contact support</div>
            <div className="mt-1 text-sm text-slate-600">
              Send us a message. We usually reply within 24 hours.
            </div>
          </div>

          <button
            type="button"
            onClick={closeSupport}
            className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-black/5"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900">Your email</label>
              <input
                ref={firstFieldRef}
                value={form.replyToEmail}
                onChange={(e) => setField("replyToEmail", e.target.value)}
                placeholder="name@example.com"
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-slate-900 outline-none focus:border-black/20"
                autoComplete="email"
                inputMode="email"
              />
              <div className="mt-1 text-xs text-slate-500">
                We’ll use this to reply to you.
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900">Subject</label>
              <input
                value={form.subjectText}
                onChange={(e) => setField("subjectText", e.target.value)}
                placeholder="Support request"
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-slate-900 outline-none focus:border-black/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900">Message</label>
              <textarea
                value={form.messageText}
                onChange={(e) => setField("messageText", e.target.value)}
                placeholder="Tell us what happened, and what you expected."
                rows={6}
                className="mt-1 w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2 text-slate-900 outline-none focus:border-black/20"
              />
              <div className="mt-1 text-xs text-slate-500">
                Minimum 10 characters.
              </div>
            </div>

            {submitState.status === "error" ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {submitState.errorMessage}
              </div>
            ) : null}

            {submitState.status === "sent" ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                Email draft opened. If it didn’t, please check your browser popup settings and try again.
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              {pagePath ? (
                <>
                  Page: <span className="font-mono">{pagePath}</span>
                </>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeSupport}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-black/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {submitState.status === "sending" ? "Opening…" : "Send message"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
