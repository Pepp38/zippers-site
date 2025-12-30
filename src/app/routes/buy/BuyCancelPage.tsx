import { useParams, Link } from 'react-router-dom';

export function BuyCancelPage() {
  const { sku } = useParams<{ sku: string }>();

  return (
    <main style={{ padding: 24, maxWidth: 640 }}>
      <h1>No payment was made.</h1>
      <p>The checkout was cancelled.</p>

      <p style={{ marginTop: 16 }}>
        <Link to={`/buy/${sku ?? ''}`}>Back</Link>
      </p>
    </main>
  );
}
