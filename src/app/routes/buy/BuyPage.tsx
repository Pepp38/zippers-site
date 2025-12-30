import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATALOG } from '../../../catalog/catalog';
import type { CatalogItem } from '../../../catalog/types';
import { parseProductSku } from '../../../lib/sku';

function isValidGitHubUsername(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 1 || trimmed.length > 39) return false;
  if (!/^[A-Za-z0-9-]+$/.test(trimmed)) return false;
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) return false;
  return true;
}

type FieldErrors = {
  githubUsername?: string;
  confirmGithubUsername?: string;
};

export function BuyPage() {
  const params = useParams();
  const sku = parseProductSku(params.sku ?? '');

  const item: CatalogItem | null = useMemo(() => {
    if (!sku) return null;
    return CATALOG[sku];
  }, [sku]);

  const [githubUsername, setGithubUsername] = useState('');
  const [confirmGithubUsername, setConfirmGithubUsername] = useState('');
  const [touched, setTouched] = useState({ githubUsername: false, confirmGithubUsername: false });

  const normalizedGithub = githubUsername.trim();
  const normalizedConfirm = confirmGithubUsername.trim();

  const errors: FieldErrors = {};

  if (touched.githubUsername) {
    if (!normalizedGithub) {
      errors.githubUsername = 'Required.';
    } else if (!isValidGitHubUsername(normalizedGithub)) {
      errors.githubUsername = 'Invalid GitHub username.';
    }
  }

  if (touched.confirmGithubUsername) {
    if (!normalizedConfirm) {
      errors.confirmGithubUsername = 'Required.';
    } else if (normalizedConfirm !== normalizedGithub) {
      errors.confirmGithubUsername = 'Does not match.';
    }
  }

  const canSubmit =
    !!item &&
    isValidGitHubUsername(normalizedGithub) &&
    normalizedConfirm === normalizedGithub;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({ githubUsername: true, confirmGithubUsername: true });
    if (!canSubmit) return;

    const github = normalizedGithub.toLowerCase();
    // UI-only bloc: no checkout yet.
    alert(`Checkout not wired yet.\n\nProduct: ${item!.sku}\nGitHub: ${github}`);
  }

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Unknown product</h1>
        <p className="mt-3 opacity-80">This SKU does not exist in the catalog.</p>
        <p className="mt-6">
          <Link to="/savior/premium" className="link-primary">
            Back to Savior Premium
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <p className="text-sm opacity-70">
          <Link to="/savior/premium" className="link-primary">
            Savior Premium
          </Link>
          <span className="opacity-40"> / </span>
          <span>Buy</span>
        </p>

        <h1 className="mt-2 text-2xl font-semibold">{item.name}</h1>
        <p className="mt-3 text-sm opacity-80">{item.shortDescription}</p>
      </header>

      <section className="rounded-2xl border border-std bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide opacity-70">Includes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm opacity-90">
              {item.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="text-right">
            <div className="text-sm opacity-70">Price</div>
            <div className="text-lg font-semibold">
              ${item.priceUsd.toFixed(2)} {item.currency}
            </div>
          </div>
        </div>

        <hr className="my-6 border-std opacity-60" />

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">GitHub username</label>
            <input
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, githubUsername: true }))}
              placeholder="your-username"
              className="mt-2 w-full rounded-xl border border-std bg-white px-4 py-3 text-sm outline-none focus:ring-0"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            {errors.githubUsername && (
              <p className="mt-2 text-sm text-red-700">{errors.githubUsername}</p>
            )}
            <p className="mt-2 text-xs opacity-70">
              This is used to send the GitHub invitation for the private package.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold">Confirm GitHub username</label>
            <input
              value={confirmGithubUsername}
              onChange={(e) => setConfirmGithubUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, confirmGithubUsername: true }))}
              placeholder="your-username"
              className="mt-2 w-full rounded-xl border border-std bg-white px-4 py-3 text-sm outline-none focus:ring-0"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            {errors.confirmGithubUsername && (
              <p className="mt-2 text-sm text-red-700">{errors.confirmGithubUsername}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className="focus-ring w-full rounded-xl border border-std bg-white px-4 py-3 text-sm font-semibold shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue to payment
            </button>

            <p className="mt-3 text-xs opacity-70">
              Checkout is not wired in Bloc A (no Stripe, no API calls).
            </p>
          </div>
        </form>
      </section>

      <p className="mt-8 text-xs opacity-70">
        By continuing, you confirm the GitHub username is correct. Invitations are tied to that account.
      </p>
    </main>
  );
}
