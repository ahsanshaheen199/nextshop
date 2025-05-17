import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { cookies } from 'next/headers';

export async function getCart() {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    return;
  }

  const response = await apiFetchWithoutAuth(`/wc/store/v1/cart`, {
    headers: {
      'cart-token': cartId,
    },
    next: {
      tags: ['getCart'],
    },
  });

  if (!response.ok) {
    return;
  }

  return response.json();
}
