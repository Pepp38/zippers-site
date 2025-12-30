import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      <main style={{ padding: 24 }}>
        <h1>Buy</h1>
        <p>Unknown product.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 560 }}>
      <h1 style={{ marginBottom: 8 }}>Buy {item.title}</h1>
      <p style={{ marginTop: 0, opacity: 0.85 }}>
        Enter your GitHub username. You will be redirected to Stripe Checkout.
      </p>

      <label style={{ display: 'block', marginTop: 16, marginBottom: 8 }}>
        GitHub username
      </label>
      <input
        value={githubUsername}
        onChange={(e) => setGithubUsername(e.target.value)}
        placeholder="plc-creates"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(0,0,0,0.15)',
          color: 'inherit',
        }}
      />

      <div style={{ marginTop: 12, fontSize: 14, opacity: 0.85 }}>
        {githubUsername.length > 0 && !isGithubValid ? (
          <span>Invalid GitHub username.</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>

      {errorMessage ? (
        <p style={{ marginTop: 12 }}>{errorMessage}</p>
      ) : (
        <div style={{ height: 12 }} />
      )}

      <button
        onClick={onContinue}
        disabled={!canSubmit}
        style={{
          marginTop: 8,
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.2)',
          background: canSubmit ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
          color: 'inherit',
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}
      >
        {isSubmitting ? 'Starting checkout…' : 'Continue to payment'}
      </button>
    </main>
  );
}
