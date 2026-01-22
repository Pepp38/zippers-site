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

const noRestoreByDesignExamples: string[] = [
  "You never call commit() (draft-only or no persistence)",
  "Validation fails for the committed payload (schema mismatch, version drift)",
  "Commit artifact is partial or inconsistent (interrupted write)",
  "Snapshot exists but fails validation or cannot be trusted deterministically",
  "Storage was cleared or restricted (private browsing / browser policy)",
];

function Panel(props: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-white">{props.title}</h2>

        {/* Savior accent line */}
        <span
          aria-hidden="true"
          className="h-px flex-1 max-w-28 bg-gradient-to-r from-emerald-300/80 via-emerald-400/40 to-transparent"
        />
      </div>

      <div className="mt-3 text-slate-200/90">{props.children}</div>
    </section>
  );
}

function AccentTopRule() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-300/90 via-emerald-400/50 to-transparent"
    />
  );
}

export function SafeStateRecoveryPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Content */}
        <div className="min-w-0 space-y-6">
          {/* Hero */}
          <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
            <AccentTopRule />

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Savior SafeState Recovery
            </h1>

            <p className="mt-3 text-slate-200/90">
              Autosave reduces everyday loss. SafeState defines a deterministic recovery boundary
              for the failures autosave does not solve.
            </p>

            <p className="mt-3 text-slate-200/90">
              <span className="font-medium text-slate-100">
                Restore the last committed application state deterministically, or restore nothing
                when certainty does not exist.
              </span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200/80">
                Two-phase persistence
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200/80">
                Validation-gated restore
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200/80">
                Restore nothing on doubt
              </span>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/80">
                Savior reliability boundary
              </p>
            </div>
          </header>

          <Panel title="What SafeState is">
            <p>
              SafeState Recovery is a production-grade recovery layer for failure scenarios autosave
              cannot handle.
            </p>
            <p className="mt-2">Works standalone. Can also be used alongside Savior Core.</p>
          </Panel>

          <Panel title="Why SafeState exists">
            <p>
              It exists for teams who have already experienced the cost of silent data loss: lost
              user input, abandoned forms, support tickets, and irreversible user frustration.
            </p>
            <p className="mt-2">
              Savior Core helps prevent loss during normal usage. SafeState covers the moments where
              failure still happens.
            </p>
          </Panel>

          <Panel title="How it works (30 seconds)">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Persist draft changes during user input (optional)</li>
              <li>
                Commit only when the app state is known to be valid (your validation decides “valid”)
              </li>
              <li>
                Restore only committed states after crashes, tab kills, refreshes, or interrupted
                writes
              </li>
              <li>If certainty does not exist, restore nothing</li>
            </ol>
          </Panel>

          <Panel title="What SafeState guarantees">
            <ul className="list-disc space-y-2 pl-5">
              <li>Only a technically valid application state can be restored</li>
              <li>Works across crashes, tab kills, refreshes, and interrupted writes</li>
              <li>Refuses to restore when certainty does not exist</li>
              <li>Deterministic behavior by design</li>
            </ul>

            <p className="mt-3">SafeState never second-guesses your validation logic.</p>
            <p className="mt-2">This behavior is intentional and non-negotiable.</p>
          </Panel>

          <Panel title="What you get">
            <ul className="list-disc space-y-2 pl-5">
              <li>Two-phase persistence: draft → committed</li>
              <li>Optional snapshot fallback</li>
              <li>Strict validation before any restore</li>
              <li>Deterministic restore order</li>
              <li>Structured, typed debug information</li>
            </ul>
          </Panel>

          <Panel title="What it is not">
            <ul className="list-disc space-y-2 pl-5">
              <li>Not a high-frequency autosave engine</li>
              <li>Not sync, collaboration, or a cloud service</li>
              <li>Not a best-effort “magic restore”</li>
            </ul>

            <p className="mt-3">SafeState only restores explicitly committed application states.</p>
          </Panel>

          <Panel title="Pick the right tool">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Use <span className="font-medium text-slate-100">Savior Core</span> for everyday form
                autosave.
              </li>
              <li>
                Use <span className="font-medium text-slate-100">SafeState Recovery</span> for
                crash-safe, deterministic restore of committed state.
              </li>
            </ul>
          </Panel>

          {/* Deep dive */}
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
            <AccentTopRule />

            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-white">Deep dive</h2>
              <span
                aria-hidden="true"
                className="h-px flex-1 max-w-28 bg-gradient-to-r from-emerald-300/70 via-emerald-400/30 to-transparent"
              />
            </div>

            <p className="mt-2 text-sm text-slate-200/80">
              Optional details for integration and deterministic recovery behavior.
            </p>

            <div className="mt-4 space-y-3">
              <details
                id="api"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <summary className="cursor-pointer text-sm font-medium text-white">
                  Minimal API surface (mental model)
                </summary>

                <div className="mt-3 space-y-3 text-sm text-slate-200/90">
                  <p>
                    You decide what “valid” means. SafeState only restores states you explicitly
                    commit after your validation step.
                  </p>

                  <p className="text-xs text-slate-200/70">
                    SafeState never second-guesses your validation logic. If your validation is too
                    permissive, SafeState will do exactly what you told it to do.
                  </p>

                  <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-3 text-xs leading-relaxed text-slate-200">
                    <code>{apiSurfaceSnippet}</code>
                  </pre>

                  <p className="text-xs text-slate-200/70">
                    If you never call <span className="text-slate-100">commit()</span>, SafeState
                    will never restore anything.
                  </p>
                </div>
              </details>

              <details
                id="matrix"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <summary className="cursor-pointer text-sm font-medium text-white">
                  Recovery behavior matrix
                </summary>

                <div className="mt-3 space-y-3 text-sm text-slate-200/90">
                  <p>
                    Deterministic outcomes. When certainty does not exist, SafeState restores
                    nothing.
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
                        {behaviorMatrix.map((row) => (
                          <tr key={row.event} className="border-t border-white/10">
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

              <details className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-white">
                  Covered failure scenarios
                </summary>

                <div className="mt-3 space-y-2 text-sm text-slate-200/90">
                  <ul className="list-disc space-y-1 pl-5">
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

              <details className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-white">
                  When SafeState does nothing (by design)
                </summary>

                <div className="mt-3 space-y-2 text-sm text-slate-200/90">
                  <ul className="list-disc space-y-1 pl-5">
                    {noRestoreByDesignExamples.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <p className="text-xs text-slate-200/70">
                    This is the point: SafeState turns uncertain recovery into an explicit empty state,
                    instead of guessing.
                  </p>
                </div>
              </details>

              <details
                id="integration"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <summary className="cursor-pointer text-sm font-medium text-white">
                  Integration overview (5 minutes)
                </summary>

                <div className="mt-3 space-y-2 text-sm text-slate-200/90">
                  <ol className="list-decimal space-y-1 pl-5">
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

              <details className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-white">
                  Browser support & storage defaults
                </summary>

                <div className="mt-3 space-y-3 text-sm text-slate-200/90">
                  <p>
                    SafeState is client-side persistence. Your storage adapter determines where data
                    lives (localStorage, IndexedDB, custom).
                  </p>

                  <ul className="list-disc space-y-1 pl-5">
                    <li>
                      <span className="font-medium text-slate-100">Default storage:</span>{" "}
                      adapter-driven (choose localStorage, IndexedDB, or custom)
                    </li>
                    <li>
                      <span className="font-medium text-slate-100">Private browsing:</span> storage
                      may be cleared or restricted depending on browser settings
                    </li>
                    <li>
                      <span className="font-medium text-slate-100">Multi-device:</span> not supported
                      (no sync, no backend)
                    </li>
                    <li>
                      <span className="font-medium text-slate-100">Data sensitivity:</span> avoid
                      storing secrets or regulated PII in client storage
                    </li>
                  </ul>

                  <p className="text-xs text-slate-200/70">
                    SafeState focuses on deterministic recovery guarantees within a single browser
                    environment. If your constraints require server-side durability, this is not that.
                  </p>
                </div>
              </details>
            </div>
          </section>

          <div className="pt-2">
            <Link
              to="/savior"
              className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-emerald-200"
            >
              Back to Savior
            </Link>
          </div>
        </div>

        {/* Aside */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
            <AccentTopRule />

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-200/70">
              At a glance
            </p>

            <p className="mt-3 text-sm text-slate-200/90">
              Deterministic restore of the last committed state. If validation fails or certainty does
              not exist, restore nothing.
            </p>

            <div className="mt-4 space-y-2 text-sm text-slate-200/90">
              <div className="flex gap-2">
                <span className="text-emerald-200">✓</span>
                <span>Commit-gated restore</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-200">✓</span>
                <span>Validation required</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-200">✓</span>
                <span>No best-effort recovery</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-slate-200/90">$69 USD · one-time purchase</p>
              <p className="mt-1 text-xs text-slate-200/70">
                Reliability guarantees, not best-effort recovery.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed"
            >
              Finishing delivery flow
            </button>

            <p className="mt-2 text-xs text-slate-200/70">
              Checkout temporarily paused while we harden delivery confirmation.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
            <AccentTopRule />

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-200/70">
              Jump to
            </p>

            <div className="mt-3 space-y-2 text-sm">
              <a
                href="#api"
                className="block text-slate-200/80 underline underline-offset-4 hover:text-emerald-200"
              >
                Minimal API
              </a>
              <a
                href="#matrix"
                className="block text-slate-200/80 underline underline-offset-4 hover:text-emerald-200"
              >
                Recovery matrix
              </a>
              <a
                href="#integration"
                className="block text-slate-200/80 underline underline-offset-4 hover:text-emerald-200"
              >
                Integration
              </a>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <Link
                to="/savior"
                className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-emerald-200"
              >
                Back to Savior
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
