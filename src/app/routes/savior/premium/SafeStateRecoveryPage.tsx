import { Link } from 'react-router-dom';
import { CATALOG } from '../../../../catalog/catalog';

export function SafeStateRecoveryPage() {
  const item = CATALOG['savior-premium-safestate-recovery'];

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm opacity-70">
          <Link to="/savior/premium" className="link-primary">
            Savior Premium
          </Link>
          <span className="opacity-40"> / </span>
          <span>{item.name}</span>
        </p>

        <h1 className="mt-2 text-3xl font-semibold">{item.name}</h1>

        <p className="mt-4 max-w-2xl text-base opacity-80">
          Restores drafts conservatively when state is ambiguous. The goal is simple: keep the user’s input safe even when the DOM and saved data disagree.
        </p>
      </header>

      <section className="rounded-2xl border border-std bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-70">What you get</h2>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm opacity-90">
          {item.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm opacity-80">
            Price: <span className="font-semibold">${item.priceUsd.toFixed(2)} {item.currency}</span>
          </div>

          <Link
            to={`/buy/${item.sku}`}
            className="focus-ring rounded-xl border border-std bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
          >
            {item.ctaLabel}
          </Link>
        </div>
      </section>

      <p className="mt-8 text-sm opacity-70">
        Savior Core stays open source. <Link to="/" className="underline">Back to core landing</Link>.
      </p>
    </main>
  );
}
