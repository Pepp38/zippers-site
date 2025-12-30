export type ProductSku =
  | 'savior-premium-safestate-recovery';

export interface CatalogItem {
  sku: ProductSku;
  name: string;
  kind: 'premium-module' | 'bundle';
  shortDescription: string;
  priceUsd: number;
  currency: 'USD';
  features: string[];
  ctaLabel: string;
}
