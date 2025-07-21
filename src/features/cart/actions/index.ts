'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function createCartAndSetCookie() {
  let cart = await createCart();
  if (cart) {
    (await cookies()).set('cartToken', cart);
  }
}

export async function createCart() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const cartToken = res.headers.get('CART-TOKEN');
  if (cartToken) {
    return cartToken;
  }

  return undefined;
}

export async function addToCart(prevState: unknown, payload: { productId: string; quantity: number }) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart/add-item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify({
      id: payload.productId,
      quantity: payload.quantity,
    }),
  });

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');

    return { success: 'Item added to cart' };
  }

  console.log(await res.json());

  return { error: 'Failed to add item to cart' };
}
