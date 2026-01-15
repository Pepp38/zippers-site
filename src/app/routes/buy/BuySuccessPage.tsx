import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export function BuySuccessPage() {
  const { sku } = useParams<{ sku: string }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const githubUsername = useMemo(() => {
    if (!sku) return null;
    return sessionStorage.getItem(`buy:lastGithubUsername:${sku}`);
  }, [sku]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-white">Payment successful</h1>
      <p className="mt-2 text-slate-200/90">
        <span className="font-medium text-slate-100">Next step:</span> accept your GitHub invite
      </p>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-slate-200/90">
          {githubUsername ? (
            <>
              We sent the repository invitation to <span className="font-mono text-slate-100">@{githubUsername}</span>.
            </>
          ) : (
            <>We sent the repository invitation to the GitHub username you entered.</>
          )}
        </p>

        <div className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200/80">Checklist</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-200/90">
            <li>Check GitHub notifications</li>
            <li>Check the email linked to your GitHub account</li>
            <li>
              If you don’t see it after <span className="font-medium text-slate-100">5 minutes</span>:{' '}
              <a className="underline underline-offset-4 hover:text-slate-100" href="mailto:support@zippers.dev">
                support@zippers.dev
              </a>
            </li>
          </ol>
        </div>

        {sessionId || sku ? (
          <p className="mt-4 text-sm text-slate-200/70">
            {sessionId ? <>Reference: {sessionId}</> : null}
            {sessionId && sku ? ' · ' : null}
            {sku ? <>Product: {sku}</> : null}
          </p>
        ) : null}
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="https://github.com/settings/repositories"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Open GitHub invitations
        </a>

        <Link
          to="/products/safestate-recovery"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
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
