import { Link, useParams, useSearchParams } from 'react-router-dom';

export function BuySuccessPage() {
  const { sku } = useParams<{ sku: string }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Payment confirmed.</h1>
      <p className="mt-2 text-slate-200/90">Thank you. Your payment was completed.</p>

      <p className="mt-4 text-slate-200/90">Next step: accept the GitHub invitation.</p>

      {sessionId ? (
        <p className="mt-4 text-sm text-slate-200/70">Session: {sessionId}</p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/savior"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15"
        >
          Back to Savior
        </Link>

        <Link
          to="/products/safestate-recovery"
          className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
        >
          Product page
        </Link>

        <Link
          to={`/buy/${sku ?? ''}`}
          className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
        >
          Back to Buy
        </Link>
      </div>
    </main>
  );
}
