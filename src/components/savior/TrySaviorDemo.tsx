import { useEffect, useMemo, useRef, useState } from "react";
import Savior from "@zippers/savior";

type LogLine = { ts: string; msg: string };

function timeHMS(): string {
  return new Date().toISOString().slice(11, 19);
}

function safeErr(e: unknown): string {
  if (e instanceof Error) return `${e.name}: ${e.message}`;
  return String(e);
}

export function TrySaviorDemo() {
  const formDomId = "savior-try-form";
  const saviorFormId = "try-savior"; // id logique/stable pour le draft (indépendant du DOM)
  const logSessionKey = "zippers:savior:try:logs:v2";

  const [logs, setLogs] = useState<LogLine[]>([]);
  const mountedRef = useRef(false);

  const addLog = (msg: string) => {
    setLogs((prev) => {
      const next = [...prev, { ts: timeHMS(), msg }].slice(-250);
      try {
        sessionStorage.setItem(logSessionKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearLogs = () => {
    setLogs([]);
    try {
      sessionStorage.removeItem(logSessionKey);
    } catch {}
  };

  const tryClearDraft = () => {
    const candidates: Array<[string, unknown]> = [
      [`clearDraft("${saviorFormId}")`, saviorFormId],
      [`clearDraft("${formDomId}")`, formDomId],
      [`clearDraft("#${formDomId}")`, `#${formDomId}`],
    ];

    for (const [label, arg] of candidates) {
      try {
        (Savior as any).clearDraft?.(arg);
        addLog(`OK: ${label}`);
        return;
      } catch (e) {
        addLog(`ERR: ${label} -> ${safeErr(e)}`);
      }
    }

    addLog("ERROR: could not clear draft with any known signature");
  };

  const tryExportDraft = () => {
    const candidates: Array<[string, unknown]> = [
      [`exportDraft("${saviorFormId}")`, saviorFormId],
      [`exportDraft("${formDomId}")`, formDomId],
      [`exportDraft("#${formDomId}")`, `#${formDomId}`],
    ];

    for (const [label, arg] of candidates) {
      try {
        const data = (Savior as any).exportDraft?.(arg);
        const json = JSON.stringify(data);
        addLog(`OK: ${label} -> ${json.length} chars`);
        // Optionnel: log un extrait sans spammer
        addLog(json.length > 160 ? `draft: ${json.slice(0, 160)}…` : `draft: ${json}`);
        return;
      } catch (e) {
        addLog(`ERR: ${label} -> ${safeErr(e)}`);
      }
    }

    addLog("ERROR: could not export draft with any known signature");
  };

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    // Restore logs after refresh
    try {
      const raw = sessionStorage.getItem(logSessionKey);
      if (raw) setLogs(JSON.parse(raw) as LogLine[]);
    } catch {}

    addLog("Page loaded.");
    addLog("Initializing Savior…");

    const originalSetItem = localStorage.setItem.bind(localStorage);
    const originalRemoveItem = localStorage.removeItem.bind(localStorage);

    // Log des writes storage (preuve). Filtre élargi + safe (pas de secrets)
    localStorage.setItem = (key: string, value: string) => {
      const k = String(key);
      const lower = k.toLowerCase();
      if (lower.includes("savior") || lower.includes("draft") || lower.includes(saviorFormId)) {
        const bytes = new Blob([value]).size;
        addLog(`storage.setItem("${k}", ${bytes} bytes)`);
      }
      return originalSetItem(key, value);
    };

    localStorage.removeItem = (key: string) => {
      const k = String(key);
      const lower = k.toLowerCase();
      if (lower.includes("savior") || lower.includes("draft") || lower.includes(saviorFormId)) {
        addLog(`storage.removeItem("${k}")`);
      }
      return originalRemoveItem(key);
    };

    const formEl = document.getElementById(formDomId) as HTMLFormElement | null;
    if (!formEl) {
      addLog(`ERROR: form #${formDomId} not found`);
      return () => {
        localStorage.setItem = originalSetItem;
        localStorage.removeItem = originalRemoveItem;
      };
    }

    const onInput = (ev: Event) => {
      const el = ev.target as HTMLInputElement | HTMLTextAreaElement | null;
      if (!el) return;

      const name = el.getAttribute("name") || el.id || "unknown";

      if (el instanceof HTMLInputElement && el.type === "password") {
        addLog("Ignored: password");
        return;
      }

      addLog(`Input: ${name}`);
    };

    formEl.addEventListener("input", onInput);

    // --- Init Savior: on tente plusieurs signatures possibles et on log les erreurs réelles
    const initAttempts: Array<[string, () => void]> = [
      [`init({ selector: "#${formDomId}" })`, () => (Savior as any).init?.({ selector: `#${formDomId}` })],
      [`init({ selector: "#${formDomId}", debug: true })`, () => (Savior as any).init?.({ selector: `#${formDomId}`, debug: true })],
      [`init({ form: <form> })`, () => (Savior as any).init?.({ form: formEl })],
      [`init(<form>)`, () => (Savior as any).init?.(formEl)],
      [`init()`, () => (Savior as any).init?.()],
    ];

    let ok = false;
    for (const [label, run] of initAttempts) {
      try {
        run();
        addLog(`OK: Savior.${label}`);
        ok = true;
        break;
      } catch (e) {
        addLog(`ERR: Savior.${label} -> ${safeErr(e)}`);
      }
    }

    if (!ok) {
      addLog("ERROR: Savior.init failed (see errors above).");
    } else {
      // Check restore après un délai plus réaliste
      setTimeout(() => {
        const f = document.getElementById(formDomId) as HTMLFormElement | null;
        if (!f) return;

        const restored: string[] = [];
        const nameEl = f.querySelector<HTMLInputElement>('input[name="name"]');
        const msgEl = f.querySelector<HTMLTextAreaElement>('textarea[name="message"]');

        if (nameEl?.value) restored.push("name");
        if (msgEl?.value) restored.push("message");

        addLog(restored.length ? `Restored: ${restored.join(", ")}` : "Restored: (nothing yet)");
      }, 500);
    }

    return () => {
      formEl.removeEventListener("input", onInput);
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  const consoleText = useMemo(
    () => logs.map((l) => `${l.ts}  ${l.msg}`).join("\n"),
    [logs]
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-2xl font-semibold">Try Savior</h2>
      <p className="mt-3 max-w-2xl opacity-80">
        Type something, refresh the page, and watch it restore. Password fields are intentionally ignored.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <form id={formDomId} data-savior={saviorFormId}>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Jane Doe"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              autoComplete="off"
            />

            <label className="mt-5 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Type something and refresh the page…"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            />

            <label className="mt-5 block text-sm font-medium">Password (ignored)</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2"
              autoComplete="off"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={tryClearDraft}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Clear draft
              </button>

              <button
                type="button"
                onClick={tryExportDraft}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Export draft
              </button>

              <button
                type="button"
                onClick={clearLogs}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
              >
                Clear logs
              </button>

              <span className="ml-auto self-center text-xs opacity-60">Tip: refresh now</span>
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Under the hood</div>
            <div className="text-xs opacity-60">live console</div>
          </div>

          <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-xs leading-relaxed">
{consoleText || "Waiting for input…"}
          </pre>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-xs">
            <div className="font-semibold">What this proves</div>
            <ul className="mt-2 list-disc pl-5 opacity-80">
              <li>Init attempts and real errors are visible</li>
              <li>Password is ignored</li>
              <li>Draft can be exported as real JSON</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
