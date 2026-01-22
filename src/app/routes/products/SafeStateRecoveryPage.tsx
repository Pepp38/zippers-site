import { Link } from "react-router-dom";

type BehaviorRow = {
  event: string;
  onDisk: string;
  outcome: string;
  reason: string;
};

const behaviorMatrix: BehaviorRow[] = [
  {
    event: "Crash / tab kill before commit",
    onDisk: "Draft may exist, no committed state",
    outcome: "Restore: none",
    reason: "SafeState restores committed state only",
  },
  {
    event: "Crash / tab kill after commit",
    onDisk: "Committed state present and valid",
    outcome: "Restore: last committed",
    reason: "Deterministic restore of last committed state",
  },
  {
    event: "Interrupted write during commit",
    onDisk: "Commit record is partial / inconsistent",
    outcome: "Restore: refused",
    reason: "Certainty does not exist",
  },
  {
    event: "Corrupted snapshot fallback",
    onDisk: "Snapshot present but fails validation",
    outcome: "Restore: refused",
    reason: "Invalid payload cannot be trusted",
  },
  {
    event: "New app version breaks schema",
    onDisk: "Committed state exists but fails validation",
    outcome: "Restore: refused",
    reason: "Validation must pass to restore",
  },
];

const apiSurfaceSnippet = `// Minimal mental model
const safeState = createSafeState({ storage, key: "checkout-form" });

// You decide what "valid" means. Commit only after your validation step.
await safeState.commit(validAppState);

// On app bootstrap
const result = await safeState.recover({
  validate: (state) => isValid(state), // zod / yup / custom
});

if (result.status === "restored") {
  hydrateApp(result.state);
}

// If status is "none" or "refused", SafeState intentionally restores nothing.
`;

export function SafeStateRecoveryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Savior SafeState Recovery
        </h1>

        <p className="text-slate-200/90">
          Users sometimes lose form input in production: crashes, tab kills, refreshes, interrupted
          writes.
        </p>

        <p className="text-slate-200/90">
          <span className="font-medium text-slate-100">
            Recover the last committed application state deterministically, or restore nothing when
            certainty does not exist.
          </span>
        </p>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What SafeState is</h2>
        <p className="text-slate-200/90">
          SafeState Recovery is a production-grade recovery layer for failure scenarios autosave
          cannot handle.
        </p>
        <p className="text-slate-200/90">
          Works standalone. Can also be used alongside Savior Core.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Why SafeState exists</h2>
        <p className="text-slate-200/90">
          It exists for teams who have already experienced the cost of silent data loss: lost user
          input, abandoned forms, support tickets, and irreversible user frustration.
        </p>
        <p className="text-slate-200/90">
          Savior Core helps prevent loss during normal usage. SafeState covers the moments where
          failure still happens.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">How it works (30 seconds)</h2>
        <ol className="list-decimal space-y-2 pl-5 text-slate-200/90">
          <li>Persist draft changes during user input (optional)</li>
          <li>
            Commit only when the app state is known to be valid (your validation decides “valid”)
          </li>
          <li>
            Restore only committed states after crashes, tab kills, refreshes, or interrupted writes
          </li>
          <li>If certainty does not exist, restore nothing</li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What SafeState guarantees</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>Only a technically valid application state can be restored</li>
          <li>Works across crashes, tab kills, refreshes, and interrupted writes</li>
          <li>Refuses to restore when certainty does not exist</li>
          <li>Deterministic behavior by design</li>
        </ul>
        <p className="text-slate-200/90">This behavior is intentional and non-negotiable.</p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What you get</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>Two-phase persistence: draft → committed</li>
          <li>Optional snapshot fallback</li>
          <li>Strict validation before any restore</li>
          <li>Deterministic restore order</li>
          <li>Structured, typed debug information</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What it is not</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>Not a high-frequency autosave engine</li>
          <li>Not sync, collaboration, or a cloud service</li>
          <li>Not a best-effort “magic restore”</li>
        </ul>
        <p className="text-slate-200/90">
          SafeState only restores explicitly committed application states.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Pick the right tool</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>
            Use <span className="text-slate-100 font-medium">Savior Core</span> for everyday form
            autosave.
          </li>
          <li>
            Use <span className="text-slate-100 font-medium">SafeState Recovery</span> for crash-safe,
            deterministic restore of committed state.
          </li>
        </ul>
      </section>

      <div className="mt-8 space-y-1">
        <p className="text-sm font-medium text-slate-200/90">$69 USD · one-time purchase</p>
        <p className="text-xs text-slate-200/70">
          Reliability guarantees, not best-effort recovery.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <div className="inline-flex flex-col gap-3">
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed"
          >
            Finishing delivery flow
          </button>

          <p className="text-xs text-slate-200/70">
            Checkout temporarily paused while we harden delivery confirmation.
          </p>

          <div className="mt-4 space-y-3">
            <details className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-white">
                Minimal API surface (mental model)
              </summary>

              <div className="mt-3 space-y-3 text-sm text-slate-200/90">
                <p className="text-slate-200/90">
                  You decide what “valid” means. SafeState only restores states you explicitly
                  commit after your validation step.
                </p>

                <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-3 text-xs leading-relaxed text-slate-200">
                  <code>{apiSurfaceSnippet}</code>
                </pre>

                <p className="text-xs text-slate-200/70">
                  If you never call <span className="text-slate-100">commit()</span>, SafeState will
                  never restore anything.
                </p>
              </div>
            </details>

            <details className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-white">
                Recovery behavior matrix
              </summary>

              <div className="mt-3 space-y-3 text-sm text-slate-200/90">
                <p>
                  Deterministic outcomes. When certainty does not exist, SafeState restores nothing.
                </p>

                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-white/5 text-slate-100">
                      <tr>
                        <th className="px-3 py-2 font-medium">Event</th>
                        <th className="px-3 py-2 font-medium">On disk</th>
                        <th className="px-3 py-2 font-medium">Outcome</th>
                        <th className="px-3 py-2 font-medium">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-200/90">
                      {behaviorMatrix.map((row, idx) => (
                        <tr key={idx} className="border-t border-white/10">
                          <td className="px-3 py-2 align-top">{row.event}</td>
                          <td className="px-3 py-2 align-top">{row.onDisk}</td>
                          <td className="px-3 py-2 align-top">{row.outcome}</td>
                          <td className="px-3 py-2 align-top">{row.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-200/70">
                  “Refused” means a persisted artifact exists, but cannot be trusted deterministically.
                </p>
              </div>
            </details>

            <details className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-white">
                Covered failure scenarios
              </summary>

              <div className="mt-3 space-y-2 text-sm text-slate-200/90">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Browser crash</li>
                  <li>Tab kill / force close</li>
                  <li>Page refresh</li>
                  <li>Interrupted persistence write</li>
                  <li>Partial or invalid state serialization</li>
                  <li>Version mismatch (state fails validation)</li>
                </ul>

                <p className="text-xs text-slate-200/70">
                  Scenarios outside deterministic certainty intentionally result in no restore.
                </p>
              </div>
            </details>

            <details className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-white">
                Integration overview (5 minutes)
              </summary>

              <div className="mt-3 space-y-2 text-sm text-slate-200/90">
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Create an instance with a storage adapter + stable key</li>
                  <li>Validate your app state (zod/yup/custom)</li>
                  <li>
                    Call <span className="text-slate-100">commit(validState)</span> only after
                    validation passes
                  </li>
                  <li>
                    Call <span className="text-slate-100">recover()</span> on bootstrap and handle
                    “restored / none / refused”
                  </li>
                </ol>

                <p className="text-xs text-slate-200/70">
                  No background sync. No best-effort replay. Explicit control only.
                </p>
              </div>
            </details>

            {/* 5th expand */}
            <details className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-white">
                Browser support & storage defaults
              </summary>

              <div className="mt-3 space-y-3 text-sm text-slate-200/90">
                <p>
                  SafeState is client-side persistence. Your storage adapter determines where data
                  lives (localStorage, IndexedDB, custom).
                </p>

                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="text-slate-100 font-medium">Default storage:</span> adapter-driven
                    (choose localStorage, IndexedDB, or custom)
                  </li>
                  <li>
                    <span className="text-slate-100 font-medium">Private browsing:</span> storage may
                    be cleared or restricted depending on browser settings
                  </li>
                  <li>
                    <span className="text-slate-100 font-medium">Multi-device:</span> not supported
                    (no sync, no backend)
                  </li>
                  <li>
                    <span className="text-slate-100 font-medium">Data sensitivity:</span> avoid storing
                    secrets or regulated PII in client storage
                  </li>
                </ul>

                <p className="text-xs text-slate-200/70">
                  SafeState focuses on deterministic recovery guarantees within a single browser
                  environment. If your constraints require server-side durability, this is not that.
                </p>
              </div>
            </details>
          </div>
        </div>

        <Link
          to="/savior"
          className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
        >
          Back to Savior
        </Link>
      </div>
    </main>
  );
}
