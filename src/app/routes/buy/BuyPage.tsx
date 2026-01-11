import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createCheckoutSession } from '../../../lib/apiClient';
import { buyCatalog, isBuySku } from './buyCatalog';

const GITHUB_USERNAME_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function BuyPage() {
  const { sku: skuParam } = useParams<{ sku: string }>();

  const sku = useMemo(() => {
    const raw = (skuParam ?? '').trim();
    return isBuySku(raw) ? raw : null;
  }, [skuParam]);

  const [githubUsername, setGithubUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const item = sku ? buyCatalog[sku] : null;

  const githubUsernameNormalized = githubUsername.trim().toLowerCase();
  const isGithubValid = GITHUB_USERNAME_RE.test(githubUsernameNormalized);
  const canSubmit = !!sku && isGithubValid && !isSubmitting;

  async function onContinue() {
    if (!sku) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { url } = await createCheckoutSession({
        sku,
        githubUsername: githubUsernameNormalized,
      });

      window.location.href = url;
    } catch {
      setErrorMessage('Checkout could not be started. Please try again.');
      setIsSubmitting(false);
    }
  }

  if (!item) {
    return (
      <main className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold">Buy</h1>
        <p className="mt-2 text-slate-200/90">Unknown product.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Buy {item.title}</h1>

        <p className="text-sm font-medium text-slate-200/90">
          $69 USD · one-time purchase
        </p>

        <p className="text-slate-200/90">
          Delivered via GitHub invite to a private repository.
        </p>
      </header>


      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200/80">What you get</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200/90">
              <li>Private repo access</li>
              <li>Documentation and examples</li>
              <li>Updates included (v1 scope)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200/80">Delivery</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200/90">
              <li>Immediate access after payment (via GitHub invite)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <label className="block text-sm font-medium text-slate-200" htmlFor="githubUsername">
          GitHub username
        </label>
        <input
          id="githubUsername"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          placeholder="plc-creates"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-200/40 focus:outline-none focus:ring-2 focus:ring-white/15"
        />

        <div className="mt-2 min-h-[1.25rem] text-sm text-slate-200/80">
          {githubUsername.length > 0 && !isGithubValid ? <span>Invalid GitHub username.</span> : null}
        </div>

        {errorMessage ? <p className="mt-2 text-sm text-slate-100">{errorMessage}</p> : null}

        <button
          onClick={onContinue}
          disabled={!canSubmit}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Starting checkout…" : "Continue to payment"}
        </button>


        <div className="mt-4">
          <Link
            to="/products/safestate-recovery"
            className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
          >
            Back to product page
          </Link>
        </div>
      </section>
    </main>
  );
}
