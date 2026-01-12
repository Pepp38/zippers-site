import { Link, useParams, useSearchParams } from 'react-router-dom';

export function BuySuccessPage() {
  const { sku } = useParams<{ sku: string }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Payment confirmed.</h1>
      <p className="mt-2 text-slate-200/90">Thank you. Your payment was completed.</p>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200/80">Access</h2>

        <p className="mt-2 text-slate-200/90">
          You will receive a GitHub invitation to a private repository.
        </p>

        <p className="mt-3 text-slate-200/90">
          Delivery is automatic and usually takes less than <span className="font-medium text-slate-100">5 minutes</span>.
          If needed, wait up to <span className="font-medium text-slate-100">10 minutes</span>.
        </p>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-slate-200/90">If you don’t see the invite</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200/90">
            <li>Check GitHub notifications and your email</li>
            <li>Make sure the GitHub username you entered is correct</li>
            <li>Wait a few minutes and refresh</li>
          </ul>
        </div>

        {sessionId || sku ? (
          <p className="mt-4 text-sm text-slate-200/70">
            {sessionId ? <>Reference: {sessionId}</> : null}
            {sessionId && sku ? " · " : null}
            {sku ? <>Product: {sku}</> : null}
          </p>
        ) : null}
        </section>
      
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="https://github.com/notifications"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15"
        >
          Open GitHub notifications
        </a>

        <Link
          to="/products/safestate-recovery"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15"
        >
          Back to product page
        </Link>

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
