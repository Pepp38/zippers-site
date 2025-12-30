import { Link, useParams } from 'react-router-dom';
import { parseProductSku } from '../../../lib/sku';

export function BuyCancelPage() {
  const { sku: skuParam } = useParams();
  const sku = parseProductSku(skuParam ?? '');

  const moduleUrl = sku === 'savior-premium-safestate-recovery'
    ? '/savior/premium/safestate-recovery'
    : '/savior/premium';

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Checkout canceled</h1>
      <p className="mt-3 opacity-80">No payment was processed.</p>

      <p className="mt-8">
        <Link to={moduleUrl} className="link-primary">
          Return to product page
        </Link>
      </p>
    </main>
  );
}
