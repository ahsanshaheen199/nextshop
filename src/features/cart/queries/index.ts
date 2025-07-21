import { cookies } from 'next/headers';

export const getCart = async () => {
  const cookieStore = await cookies();
  const cartToken = cookieStore.get('cartToken');
  if (!cartToken) {
    return undefined;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wc/store/v1/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CART-TOKEN': cartToken.value,
    },
    next: { tags: ['getCart'] },
  });

  if (res.ok) {
    return res.json();
  }

  return undefined;
};
