'use client';

import { CartIcon } from '@/components/icons/cart';
import { useCart } from '@/providers/cart-provider';

export function MiniCartBtn() {
  const { cart } = useCart();

  return (
    <button className="relative">
      <CartIcon />
      <span className="absolute -top-2.5 -right-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
        {cart ? cart.items_count : 0}
      </span>
    </button>
  );
}
