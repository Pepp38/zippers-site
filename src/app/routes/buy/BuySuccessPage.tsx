import { useSearchParams, useParams, Link } from 'react-router-dom';

export function BuySuccessPage() {
  const { sku } = useParams<{ sku: string }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main style={{ padding: 24, maxWidth: 640 }}>
      <h1>Payment confirmed.</h1>
      <p>Thank you. Your payment was completed.</p>

      <p>Next step: accept the GitHub invitation.</p>

      {sessionId ? (
        <p style={{ opacity: 0.8, fontSize: 14 }}>Session: {sessionId}</p>
      ) : null}

      <p style={{ marginTop: 16 }}>
        <Link to={`/buy/${sku ?? ''}`}>Back</Link>
      </p>
    </main>
  );
}
