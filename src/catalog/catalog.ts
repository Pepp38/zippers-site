import type { CatalogItem, ProductSku } from './types';

export const CATALOG: Record<ProductSku, CatalogItem> = {
  'savior-premium-safestate-recovery': {
    sku: 'savior-premium-safestate-recovery',
    name: 'SafeState Recovery',
    kind: 'premium-module',
    shortDescription:
      'Conservative restore logic for ambiguous state. Keeps user drafts safe when the DOM and stored data disagree.',
    priceUsd: 19.99,
    currency: 'USD',
    features: [
      'Conservative restore decisions (never invents fields)',
      'Deterministic outcomes with a decision trace',
      'Fail-soft behavior on driver/storage issues',
      'Designed for real-world forms (checkboxes, radios, groups)',
      'Clear contracts and restore behavior matrix',
    ],
    ctaLabel: 'Access Premium',
  },
};
