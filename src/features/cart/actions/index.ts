'use server';

import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function createCartAndSetCookie() {
  const { cartToken, nonce } = await createCart();
  if (cartToken) {
    (await cookies()).set('cartToken', cartToken);
  }

  if (nonce) {
    (await cookies()).set('nonce', nonce);
  }
}

export async function createCart() {
  const res = await apiFetchWithoutAuth(`/wc/store/v1/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const cartToken = res.headers.get('CART-TOKEN');
  const nonce = res.headers.get('Nonce');

  return { cartToken: cartToken || undefined, nonce: nonce || undefined };
}

export async function addToCart(
  prevState: unknown,
  payload: { productId: string; quantity: number; variation?: { attribute: string; value: string }[] }
) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await apiFetchWithoutAuth(`/wc/store/v1/cart/add-item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify({
      id: payload.productId,
      quantity: payload.quantity,
      ...(payload.variation && { variation: payload.variation }),
    }),
  });

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');
    (await cookies()).set('nonce', res.headers.get('Nonce') || '');

    return { success: 'Item added to cart' };
  }

  const result = await res.json();

  return { error: result.message };
}

export async function updateCart(prevState: unknown, payload: { key: string; quantity: number }) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await apiFetchWithoutAuth(`/wc/store/v1/cart/update-item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify({
      key: payload.key,
      quantity: payload.quantity,
    }),
  });

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');
    (await cookies()).set('nonce', res.headers.get('Nonce') || '');

    return { success: 'Item updated in cart' };
  }

  const result = await res.json();

  return { error: result.message };
}

export async function removeItemFromCart(prevState: unknown, payload: { key: string }) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await apiFetchWithoutAuth(`/wc/store/v1/cart/remove-item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify({
      key: payload.key,
    }),
  });

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');
    (await cookies()).set('nonce', res.headers.get('Nonce') || '');

    return { success: 'Item removed from cart' };
  }

  const result = await res.json();

  return { error: result.message };
}

export async function applyCoupon(prevState: unknown, formData: FormData) {
  const cartToken = (await cookies()).get('cartToken')?.value;
  const coupon = formData.has('coupon') ? formData.get('coupon')?.toString() : '';

  const res = await apiFetchWithoutAuth(`/wc/store/v1/cart/apply-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify({
      code: coupon,
    }),
  });

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');
    (await cookies()).set('nonce', res.headers.get('Nonce') || '');

    return { success: 'Coupon applied' };
  }

  const result = await res.json();

  return { error: result.message, coupon: coupon || '' };
}

export async function removeCoupon(prevState: unknown, formData: FormData) {
  const cartToken = (await cookies()).get('cartToken')?.value;
  const coupon = formData.has('code') ? formData.get('code')?.toString() : '';

  const res = await apiFetchWithoutAuth(`/wc/store/v1/cart/remove-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify({
      code: coupon,
    }),
  });

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');
    (await cookies()).set('nonce', res.headers.get('Nonce') || '');

    return { success: 'Coupon removed' };
  }

  const result = await res.json();

  return { error: result.message };
}

export async function updateShippingRate(payload: { package_id: number; rate_id: string }) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await apiFetchWithoutAuth(`/wc/store/v1/cart/select-shipping-rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');
    (await cookies()).set('nonce', res.headers.get('Nonce') || '');

    return { success: 'Shipping rate updated' };
  }

  const result = await res.json();

  return { error: result.message };
}

export async function addGroupedProductsToCart(prevState: unknown, payload: { id: number; quantity: number }[]) {
  const cartToken = (await cookies()).get('cartToken')?.value;
  const nonce = (await cookies()).get('nonce')?.value;
  const res = await apiFetchWithoutAuth(`/wc/store/v1/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken || '',
    },
    body: JSON.stringify({
      requests: payload.map((item) => ({
        path: '/wc/store/v1/cart/add-item',
        method: 'POST',
        body: {
          id: item.id,
          quantity: item.quantity,
        },
        cache: 'no-store',
        headers: {
          Nonce: nonce || '',
          'CART-TOKEN': cartToken || '',
        },
      })),
    }),
  });

  if (res.ok) {
    revalidateTag('getCart');

    const result = await res.json();

    let cartTokenFromBatch: string | undefined;
    let nonceFromBatch: string | undefined;

    for (const r of result.responses ?? []) {
      const raw = r.headers ?? {};
      const headers = Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v[0] : v])
      );

      if (!cartTokenFromBatch && headers['cart-token']) {
        cartTokenFromBatch = headers['cart-token'];
      }
      if (!nonceFromBatch && headers['nonce']) {
        nonceFromBatch = headers['nonce'];
      }
    }

    // Update cookies if present
    if (cartTokenFromBatch) {
      (await cookies()).set('cartToken', cartTokenFromBatch);
    }
    if (nonceFromBatch) {
      (await cookies()).set('nonce', nonceFromBatch);
    }

    return { success: 'Grouped products added to cart' };
  }

  const result = await res.json();

  return { error: result.message };
}
