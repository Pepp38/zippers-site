export type BuySku = 'savior-premium-safestate-recovery';

export type BuyCatalogItem = {
  sku: BuySku;
  title: string;
};

export const buyCatalog: Record<BuySku, BuyCatalogItem> = {
  'savior-premium-safestate-recovery': {
    sku: 'savior-premium-safestate-recovery',
    title: 'SafeState Recovery',
  },
};

export function isBuySku(value: string): value is BuySku {
  return value === 'savior-premium-safestate-recovery';
}
