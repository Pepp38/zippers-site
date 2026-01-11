import { useParams, Link } from 'react-router-dom';

export function BuyCancelPage() {
  const { sku } = useParams<{ sku: string }>();

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Checkout canceled.</h1>
      <p className="mt-2 text-slate-200/90">No charge was made.</p>

      <p className="mt-4 text-slate-200/90">
        You can return to the product page or try again when ready.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/products/safestate-recovery"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15"
        >
          Back to product page
        </Link>

        <Link
          to={`/buy/${sku ?? ''}`}
          className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
        >
          Try checkout again
        </Link>
      </div>
    </main>
  );
}
