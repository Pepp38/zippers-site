import { Link } from 'react-router-dom';
import { CATALOG } from '../../../../catalog/catalog';

export function PremiumIndex() {
  const module = CATALOG['savior-premium-safestate-recovery'];

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm opacity-70">Savior</p>
        <h1 className="mt-2 text-3xl font-semibold">Savior Premium</h1>
        <p className="mt-4 max-w-2xl text-base opacity-80">
          Premium modules extend Savior Core with explicit contracts and focused guarantees.
          Savior Core stays open source.
        </p>
      </header>

      <section aria-label="Premium modules">
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-70">Modules</h2>

        <div className="mt-4 rounded-2xl border border-std bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">{module.name}</h3>
              <p className="mt-2 text-sm opacity-80">{module.shortDescription}</p>
            </div>

            <div className="text-right">
              <div className="text-sm opacity-70">From</div>
              <div className="text-lg font-semibold">${module.priceUsd.toFixed(2)} {module.currency}</div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <Link
              to="/savior/premium/safestate-recovery"
              className="focus-ring link-primary rounded-md text-sm"
            >
              View details
            </Link>

            <Link
              to="/buy/savior-premium-safestate-recovery"
              className="focus-ring rounded-xl border border-std bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
            >
              {module.ctaLabel}
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm opacity-70">
          Looking for the core? <Link to="/" className="underline">Go back to Savior Core</Link>.
        </p>
      </section>
    </main>
  );
}
