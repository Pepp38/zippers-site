export type BuySku = 'savior-safestate-recovery';

export type BuyCatalogItem = {
  sku: BuySku;
  title: string;
};

export const buyCatalog: Record<BuySku, BuyCatalogItem> = {
  'savior-safestate-recovery': {
    sku: 'savior-safestate-recovery',
    title: 'SafeState Recovery',
  },
};

export function isBuySku(value: string): value is BuySku {
  return value === 'savior-safestate-recovery';
}
