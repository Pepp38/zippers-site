import { Link } from "react-router-dom";

export function SafeStateRecoveryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Savior SafeState Recovery
        </h1>

        <p className="text-slate-200/90">
          <span className="font-medium text-slate-100">
            Never lose a technically valid draft, even when autosave fails.
          </span>
        </p>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Why SafeState exists</h2>
        <p className="text-slate-200/90">
          SafeState Recovery is a production-grade recovery layer designed for failure scenarios
          autosave cannot handle.
        </p>
        <p className="text-slate-200/90">
          It exists for teams who have already experienced the cost of silent data loss: lost user
          input, abandoned forms, support tickets, and irreversible user frustration.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What SafeState guarantees</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>Only a technically valid application state can be restored</li>
          <li>Works across crashes, tab kills, refreshes, and interrupted writes</li>
          <li>Refuses to restore when certainty does not exist</li>
          <li>Deterministic behavior by design</li>
        </ul>
        <p className="text-slate-200/90">
          This behavior is intentional and non-negotiable.
        </p>
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

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-base font-semibold text-white">Requires</h2>
        <p className="mt-2 text-slate-200/90">Requires Savior Core (free).</p>
      </section>

      <div className="mt-10 flex flex-col gap-4">
        <Link
          to="/buy/savior-premium-safestate-recovery"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Buy SafeState Recovery
        </Link>

        <Link
          to="/savior"
          className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
        >
          Back to Savior Core
        </Link>
      </div>
    </main>
  );
}
