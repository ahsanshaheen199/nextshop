import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { ProductResponseItem } from '@/types/product-response';
import { cache } from 'react';
import { notFound } from 'next/navigation';

export async function getProductBySlug(productSlug: string) {
  const response = await apiFetchWithoutAuth(`/wc/store/v1/products/${productSlug}`);

  if (!response.ok) {
    notFound();
  }
  return (await response.json()) as ProductResponseItem;
}

export const getProduct = cache(async (productSlug: string) => {
  return await getProductBySlug(productSlug);
});
