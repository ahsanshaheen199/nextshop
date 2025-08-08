'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function createCartAndSetCookie() {
  const cart = await createCart();
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

  return { error: 'Failed to add item to cart' };
}

export async function updateCart(prevState: unknown, payload: { key: string; quantity: number }) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart/update-item`, {
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

    return { success: 'Item updated in cart' };
  }

  const result = await res.json();

  return { error: result.message };
}

export async function removeItemFromCart(prevState: unknown, payload: { key: string }) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart/remove-item`, {
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

    return { success: 'Item removed from cart' };
  }

  return { error: 'Failed to remove item from cart' };
}

export async function applyCoupon(prevState: unknown, formData: FormData) {
  const cartToken = (await cookies()).get('cartToken')?.value;
  const coupon = formData.has('coupon') ? formData.get('coupon')?.toString() : '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart/apply-coupon`, {
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

    return { success: 'Coupon applied' };
  }

  const result = await res.json();

  return { error: result.message, coupon: coupon || '' };
}

export async function removeCoupon(prevState: unknown, formData: FormData) {
  const cartToken = (await cookies()).get('cartToken')?.value;
  const coupon = formData.has('code') ? formData.get('code')?.toString() : '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart/remove-coupon`, {
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

    return { success: 'Coupon removed' };
  }

  const result = await res.json();

  return { error: result.message };
}

export async function updateShippingRate(payload: { package_id: number; rate_id: string }) {
  const cartToken = (await cookies()).get('cartToken')?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart/select-shipping-rate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CART-TOKEN': cartToken || '',
      },
      body: JSON.stringify(payload),
    }
  );

  if (res.ok) {
    revalidateTag('getCart');

    (await cookies()).set('cartToken', res.headers.get('CART-TOKEN') || '');

    return { success: 'Shipping rate updated' };
  }

  const result = await res.json();

  console.log(result);

  return { error: result.message };
}
