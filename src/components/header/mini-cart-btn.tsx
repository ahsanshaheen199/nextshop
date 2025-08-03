'use client';

import { CartIcon } from '../icons/cart';
import { useCart } from '@/providers/cart-provider';
import { Fragment, useEffect, useRef, useState } from 'react';
import { createCartAndSetCookie } from '@/features/cart/actions';
import { Cross } from '../icons/cross';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { ShippingCartIcon } from '../icons/shipping-cart';
import Image from 'next/image';
import { formatPrice } from '@/utlis';
import { CartQuantityControl } from '../cart-quantity-control';

export const MiniCartBtn = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.items_count);

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

  console.log(cart);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="relative cursor-pointer">
        <CartIcon />
        <span className="absolute -top-2.5 -right-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
          {cart?.items_count || 0}
        </span>
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed top-0 right-0 bottom-0 flex h-full w-full flex-col bg-white px-4 py-6 text-black backdrop-blur-xl md:w-[390px] dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">My Cart</DialogTitle>
                <button className="cursor-pointer" aria-label="Close cart" onClick={() => setIsOpen(false)}>
                  <Cross />
                </button>
              </div>

              {!cart || cart.items_count === 0 ? (
                <div className="flex w-full grow flex-col items-center justify-center overflow-hidden">
                  <ShippingCartIcon className="h-16" />

                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="grow overflow-auto py-4">
                    {cart.items.map((item) => (
                      <li className="w-full border-b border-black/10 py-4" key={item.id}>
                        <div className="flex gap-x-3.5">
                          <div className="relative h-[100px] w-[100px] flex-none rounded-lg border border-black/10">
                            <Image
                              src={item.images[0].thumbnail}
                              alt={item.name}
                              fill
                              className="h-full w-full rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col gap-y-3">
                              <div>
                                <p className="font-satoshi-bold text-base">{item.name}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="font-satoshi-bold text-xl leading-none text-black">
                                  {formatPrice(item.prices.sale_price, item.prices)}
                                </p>
                                <CartQuantityControl item={item} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};
