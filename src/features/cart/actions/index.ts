'use server';

import { Product } from '@/features/product/types';
import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(
  prevState: unknown,
  {
    product,
    variation,
    quantity,
  }: { product: Product; quantity: number; variation?: { attribute: string; value: string }[] }
) {
  const cookieStore = await cookies();
  const nonce = cookieStore.get('nonce')?.value;
  const cartId = cookieStore.get('cartId')?.value;

  if (!nonce) {
    const response = await apiFetchWithoutAuth(`/wc/store/v1/cart`);
    if (response.ok) {
      const nonce = response.headers.get('nonce');
      if (nonce) {
        cookieStore.set('nonce', nonce, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      }
    }
  }

  const response = await apiFetchWithoutAuth(`/wc/store/v1/cart/add-item`, {
    method: 'POST',
    headers: {
      ...(cartId && { 'cart-token': cartId }),
      nonce: nonce || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: product.id,
      quantity: quantity,
      ...(variation && { variation: variation }),
    }),
  });

  if (!response.ok) {
    return 'Failed to add item to cart';
  }

  if (!cartId) {
    cookieStore.set('cartId', response.headers.get('cart-token') || '', {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    });
  }

  revalidateTag('getCart');

  return 'Item added to cart';
}
