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
import { CartRemoveBtn } from '@/features/cart/components/cart-remove-btn';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../form/button';

export const MiniCartBtn = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.items_count);
  const pathname = usePathname();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.items_count &&
      cart?.items_count !== quantityRef.current &&
      cart?.items_count > 0 &&
      pathname !== '/cart'
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
    }
    quantityRef.current = cart?.items_count;
  }, [isOpen, cart?.items_count, quantityRef]);

  return (
    <div>
      <button
        onClick={() => {
          if (pathname !== '/cart' && pathname !== '/checkout') {
            setIsOpen(true);
          }
        }}
        className="relative cursor-pointer"
      >
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
            <DialogPanel className="fixed top-0 right-0 bottom-0 flex h-full w-full flex-col bg-white py-6 text-black backdrop-blur-xl md:w-[390px] dark:bg-black/80 dark:text-white">
              <div className="mb-2 flex items-center justify-between px-4">
                <DialogTitle className="text-lg font-semibold">Cart</DialogTitle>
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
                <Fragment>
                  <div className="flex grow flex-col overflow-y-auto px-4">
                    <ul className="py-4">
                      {cart.items.map((item) => {
                        return (
                          <li
                            className="relative w-full border-b border-black/10 py-4 last:border-b-0 last:pb-0"
                            key={item.id}
                          >
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
                                  <div className="flex justify-between gap-x-3">
                                    <p className="font-satoshi-bold text-base">
                                      <Link href={`/product/${item.id}`}>{item.name}</Link>
                                    </p>
                                    <CartRemoveBtn itemKey={item.key} />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="font-satoshi-bold text-xl leading-none text-black">
                                      {formatPrice(item.prices.sale_price, item.prices)}
                                    </p>
                                    <CartQuantityControl
                                      iconClassName="h-4 w-4"
                                      inputClassName="px-4 py-0 text-sm font-medium"
                                      className="min-w-[100px] px-3.5 py-2 lg:min-w-32 lg:px-5 lg:py-3"
                                      item={item}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="border-t border-black/10 px-6 pt-6">
                    <div className="flex justify-between">
                      <p className="text-lg text-black/60">Subtotal</p>
                      <p className="font-satoshi-bold text-lg font-bold text-black">
                        {formatPrice(cart.totals.total_items, {
                          currency_minor_unit: cart.totals.currency_minor_unit,
                          currency_decimal_separator: cart.totals.currency_decimal_separator,
                          currency_thousand_separator: cart.totals.currency_thousand_separator,
                          currency_prefix: cart.totals.currency_prefix,
                          currency_suffix: cart.totals.currency_suffix,
                        })}
                      </p>
                    </div>
                    <div className="mb-4 text-xs text-black/60">
                      <p>Shipping, taxes, and discounts calculated at checkout.</p>
                    </div>
                    <div className="flex justify-between gap-x-5">
                      <Button
                        isLink
                        href="/cart"
                        className="bg-white text-black ring-1 hover:bg-black hover:text-white"
                        onNavigate={() => setIsOpen(false)}
                      >
                        View Cart
                      </Button>
                      <Button
                        onNavigate={() => setIsOpen(false)}
                        isLink
                        href="/checkout"
                        className="bg-black text-white hover:bg-black/80"
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </Fragment>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};
