import { Link } from 'react-router-dom';

export function SafeStateRecoveryPage() {
  return (
    <main className="mx-auto max-w-2xl">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">SafeState Recovery</h1>
        <p className="text-slate-200/90">
          A controlled recovery layer for when the normal restore flow is not enough.
          <br />
          Built for incidents, debugging, and edge failure scenarios.
        </p>
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">When is this useful?</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>A user reports lost input you can’t reproduce</li>
          <li>A corrupted draft breaks the normal restore flow</li>
          <li>You need to inspect or restore a previous snapshot safely</li>
          <li>You want a recovery path that is explicit and controlled</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">What you get</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>Manual and programmatic recovery APIs</li>
          <li>Snapshot based state handling</li>
          <li>Safer restore paths designed for incident recovery</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">What it is not</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200/90">
          <li>Not a productivity feature pack</li>
          <li>Not a UI enhancement</li>
          <li>Not something you use every day</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-base font-semibold">Requires</h2>
        <p className="mt-2 text-slate-200/90">Requires Savior Core (free).</p>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          to="/buy/savior-premium-safestate-recovery"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15"
        >
          Buy SafeState Recovery
        </Link>

        <Link
          to="/savior"
          className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
        >
          Back to Core
        </Link>
      </div>
    </main>
  );
}
