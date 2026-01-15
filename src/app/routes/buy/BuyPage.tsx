import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createCheckoutSession } from '../../../lib/apiClient';
import { buyCatalog, isBuySku } from './buyCatalog';

const GITHUB_USERNAME_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

type BuyStep = 'edit' | 'confirm';

export function BuyPage() {
  const { sku: skuParam } = useParams<{ sku: string }>();

  const sku = useMemo(() => {
    const raw = (skuParam ?? '').trim();
    return isBuySku(raw) ? raw : null;
  }, [skuParam]);

  const item = useMemo(() => {
    if (!sku) return null;
    return buyCatalog[sku] ?? null;
  }, [sku]);

  const [step, setStep] = useState<BuyStep>('edit');

  const [githubUsername, setGithubUsername] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [confirmRetype, setConfirmRetype] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const githubUsernameNormalized = useMemo(() => githubUsername.trim().toLowerCase(), [githubUsername]);
  const confirmRetypeNormalized = useMemo(() => confirmRetype.trim().toLowerCase(), [confirmRetype]);

  const isGithubValid = useMemo(() => {
    return GITHUB_USERNAME_RE.test(githubUsernameNormalized);
  }, [githubUsernameNormalized]);

  const doesRetypeMatch = useMemo(() => {
    if (!githubUsernameNormalized) return false;
    if (!confirmRetypeNormalized) return false;
    return githubUsernameNormalized === confirmRetypeNormalized;
  }, [githubUsernameNormalized, confirmRetypeNormalized]);

  const canGoToConfirm = !!sku && isGithubValid && !isSubmitting;
  const canProceedToStripe = !!sku && isGithubValid && confirmCheckbox && doesRetypeMatch && !isSubmitting;

  function onGoToConfirm() {
    if (!canGoToConfirm) return;
    setErrorMessage(null);
    setConfirmCheckbox(false);
    setConfirmRetype('');
    setStep('confirm');
  }

  function onEditUsername() {
    if (isSubmitting) return;
    setErrorMessage(null);
    setStep('edit');
  }

  async function onProceedToStripe() {
    if (!sku) return;
    if (!canProceedToStripe) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      // Keep the username available on return pages (success/cancel).
      sessionStorage.setItem(`buy:lastGithubUsername:${sku}`, githubUsernameNormalized);

      const { url } = await createCheckoutSession({
        sku,
        githubUsername: githubUsernameNormalized,
      });

      window.location.href = url;
    } catch (err) {
      const message =
        err instanceof Error && err.message && err.message !== 'checkout_create_failed'
          ? err.message
          : 'Checkout could not be started. Please try again.';
      setErrorMessage(message);
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
    <main className="mx-auto max-w-2xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Buy</h1>
        <p className="text-slate-200/90">
          <span className="font-medium text-slate-100">{item.title}</span>
            {item.priceText ? ` · ${item.priceText}` : ""}
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
              <li>You’ll receive a GitHub invite to a private repository within minutes after payment.</li>
              <li>
                Support: <a className="underline underline-offset-4 hover:text-slate-100" href="mailto:support@zippers.dev">support@zippers.dev</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {step === 'edit' ? (
        <section className="mt-8">
          <label className="block text-sm font-medium text-slate-200" htmlFor="githubUsername">
            GitHub username
          </label>

          <input
            id="githubUsername"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="octocat"
            autoComplete="off"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-slate-100 placeholder:text-slate-200/40 outline-none focus:border-white/30"
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-200/80">
              {githubUsername.length === 0
                ? 'We deliver via a GitHub invite, so the username must be exact.'
                : isGithubValid
                  ? 'Looks valid.'
                  : 'Invalid username format.'}
            </p>

            {githubUsernameNormalized && isGithubValid ? (
              <a
                href={`https://github.com/${encodeURIComponent(githubUsernameNormalized)}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
              >
                Open this GitHub profile
              </a>
            ) : null}
          </div>

          <p className="mt-2 text-xs text-slate-200/70">
            How to find my username? It’s the part after github.com/ in your profile URL. Example: github.com/octocat → octocat.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-slate-200/90">Delivery</h3>
            <p className="mt-1 text-sm text-slate-200/90">
              You’ll receive a GitHub invite to a private repository within minutes after payment.
            </p>
            <p className="mt-1 text-sm text-slate-200/90">
              Support: <a className="underline underline-offset-4 hover:text-slate-100" href="mailto:support@zippers.dev">support@zippers.dev</a>
            </p>
          </div>

          {errorMessage ? <p className="mt-3 text-sm text-slate-100">{errorMessage}</p> : null}

          <button
            onClick={onGoToConfirm}
            disabled={!canGoToConfirm}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
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
      ) : (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold text-white">Confirm your GitHub username</h2>
          <p className="mt-2 text-slate-200/90">
            We will send the private repository invite to this account. If it’s wrong, you won’t receive the product.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-200/70">Deliver to</p>
            <p className="mt-2 font-mono text-2xl text-white">@{githubUsernameNormalized}</p>
            <a
              href={`https://github.com/${encodeURIComponent(githubUsernameNormalized)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
            >
              Open this GitHub profile
            </a>
          </div>

          <label className="mt-4 flex items-start gap-3 text-slate-200/90">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10"
              checked={confirmCheckbox}
              onChange={(e) => setConfirmCheckbox(e.target.checked)}
            />
            <span>Yes, this is my GitHub username</span>
          </label>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-200" htmlFor="confirmRetype">
              Type it again to confirm
            </label>
            <input
              id="confirmRetype"
              value={confirmRetype}
              onChange={(e) => setConfirmRetype(e.target.value)}
              placeholder={githubUsernameNormalized}
              autoComplete="off"
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-slate-100 placeholder:text-slate-200/40 outline-none focus:border-white/30"
            />

            {confirmRetype.length > 0 && !doesRetypeMatch ? (
              <p className="mt-2 text-sm text-slate-100">Doesn’t match. Please type the same username.</p>
            ) : null}
          </div>

          {errorMessage ? <p className="mt-3 text-sm text-slate-100">{errorMessage}</p> : null}

          <div className="mt-5 flex flex-col gap-3">
            <button
              onClick={onProceedToStripe}
              disabled={!canProceedToStripe}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Starting checkout…' : 'Proceed to Stripe Checkout'}
            </button>

            <button
              type="button"
              onClick={onEditUsername}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-slate-200/90 hover:bg-white/5"
            >
              Edit username
            </button>

            <Link
              to="/products/safestate-recovery"
              className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
            >
              Back to product page
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
