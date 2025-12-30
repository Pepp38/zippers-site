import type { ProductSku } from '../catalog/types';

export function isProductSku(value: string): value is ProductSku {
  return value === 'savior-premium-safestate-recovery';
}

export function parseProductSku(value: string): ProductSku | null {
  const trimmed = value.trim();
  return isProductSku(trimmed) ? trimmed : null;
}
