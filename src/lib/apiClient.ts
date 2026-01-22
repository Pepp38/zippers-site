type CreateCheckoutSessionInput = {
  sku: string;
  githubUsername: string;
};

type CreateCheckoutSessionResponse = {
  url: string;
};

function getApiBaseUrl(): string {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!apiBaseUrl || typeof apiBaseUrl !== 'string') {
    throw new Error('VITE_API_BASE_URL is not set');
  }
  return apiBaseUrl.replace(/\/+$/, '');
}

export type DeliveryStatus = 'PENDING' | 'DELIVERED' | 'FAILED' | 'UNKNOWN';

export type DeliveryStatusResponse = {
  status: DeliveryStatus;
  sku?: string;
  githubUsername?: string;
  repoUrl?: string;
  updatedAt?: string;
  reasonCode?: string;
  message?: string;
};

export async function getDeliveryStatus(sessionId: string): Promise<DeliveryStatusResponse> {
  const apiBaseUrl = getApiBaseUrl();

  const res = await fetch(
    `${apiBaseUrl}/api/delivery/status?session_id=${encodeURIComponent(sessionId)}`,
    { method: 'GET' }
  );

  if (!res.ok) {
    return { status: 'UNKNOWN', message: 'Unable to fetch delivery status.' };
  }

  const data = (await res.json()) as unknown;
  if (!data || typeof data !== 'object' || !('status' in data)) {
    return { status: 'UNKNOWN', message: 'Invalid status response.' };
  }

  return data as DeliveryStatusResponse;
}


export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<CreateCheckoutSessionResponse> {
  const apiBaseUrl = getApiBaseUrl();

  const res = await fetch(`${apiBaseUrl}/api/checkout/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error('checkout_create_failed');
  }

  const data = (await res.json()) as unknown;

  if (!data || typeof data !== 'object' || !('url' in data)) {
    throw new Error('invalid_response');
  }

  const url = (data as { url: unknown }).url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error('invalid_url');
  }

  return { url };
}
