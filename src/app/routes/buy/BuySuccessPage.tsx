import { Link, useLocation, useParams } from 'react-router-dom';
import { parseProductSku } from '../../../lib/sku';

function useQueryParam(key: string): string | null {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get(key);
}

export function BuySuccessPage() {
  const { sku: skuParam } = useParams();
  const sku = parseProductSku(skuParam ?? '');

  const github = useQueryParam('github');
  const sessionId = useQueryParam('session_id');

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Payment confirmed</h1>
      <p className="mt-3 opacity-80">Invitation will be sent to your GitHub account.</p>

      <div className="mt-8 rounded-2xl border border-std bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-70">Details</h2>
        <ul className="mt-4 space-y-2 text-sm opacity-90">
          <li>
            Product: <span className="font-semibold">{sku ?? 'Unknown SKU'}</span>
          </li>
          <li>
            GitHub: <span className="font-semibold">{github ?? '—'}</span>
          </li>
          <li>
            Session: <span className="font-semibold">{sessionId ?? '—'}</span>
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://github.com/notifications"
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-xl border border-std bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
          >
            Open GitHub notifications
          </a>

          <button
            type="button"
            disabled
            className="focus-ring rounded-xl border border-std bg-white px-4 py-2 text-sm font-semibold shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Resend invitation
          </button>
        </div>

        <p className="mt-4 text-xs opacity-70">
          Bloc A UI only. These details are placeholders unless provided by real checkout.
        </p>
      </div>

      <p className="mt-8 text-sm opacity-70">
        <Link to="/savior/premium" className="link-primary">Back to Savior Premium</Link>
      </p>
    </main>
  );
}
