'use client';

import { CartIcon } from '../icons/cart';
import { useCart } from '@/providers/cart-provider';
import { useEffect, useRef, useState } from 'react';
import { createCartAndSetCookie } from '@/features/cart/actions';
import { Cross } from '../icons/cross';

export const MiniCartBtn = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.items_count);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (cart?.items_count && cart?.items_count !== quantityRef.current && cart?.items_count > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.items_count;
    }
  }, [isOpen, cart?.items_count, quantityRef]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="relative cursor-pointer">
        <CartIcon />
        <span className="absolute -top-2.5 -right-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
          {cart?.items_count || 0}
        </span>
      </button>
      {isOpen && (
        <>
          <div
            ref={overlayRef}
            onClick={() => setIsOpen(false)}
            data-state={isOpen ? 'open' : 'closed'}
            className="fixed inset-0 z-50 cursor-pointer bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          />
          <div
            onClick={(e) => e.stopPropagation()}
            data-state={isOpen ? 'open' : 'closed'}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=open]:slide-in-from-right sm:max-w-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">My Cart</p>
              <button aria-label="Close cart" onClick={() => setIsOpen(false)}>
                <Cross />
              </button>
            </div>
            hello
          </div>
        </>
      )}
    </div>
  );
};
