'use client';

import { useCart } from '@/providers/cart-provider';
import { Breadcrumb } from '@/components/breadcrumb';
import Image from 'next/image';
import { formatPrice } from '@/utlis';
import { CartRemoveBtn } from '@/features/cart/components/cart-remove-btn';
import { CartQuantityControl } from '@/components/cart-quantity-control';
import Link from 'next/link';
import { CrossSellProducts } from '@/features/cart/components/cross-sell-products';
import { Button } from '@/components/form/button';
import { ArrowRight } from '@/components/icons/arrow-right';
import { ApplyCoupon } from '@/features/cart/components/apply-coupon';
import { CouponRemove } from '@/features/cart/components/coupon-remove';
import { ShippingCartIcon } from '@/components/icons/shipping-cart';
import { ShippingRates } from '@/features/cart/components/shipping-rates';

export default function CartPage() {
  const { cart } = useCart();

  if (!cart?.items.length)
    return (
      <main>
        <div className="container">
          <div className="border-t border-black/10 pt-6 pb-9">
            <Breadcrumb
              links={[
                { title: 'Home', href: '/' },
                { title: 'Cart', href: '#' },
              ]}
            />
          </div>
          <div className="flex flex-col items-center justify-center pb-12 lg:pb-20">
            <ShippingCartIcon className="h-16 text-black" />
            <p className="mt-6 text-center text-2xl font-bold">Your cart is currently empty.</p>
            <Link
              className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-7 py-3 font-satoshi-medium text-sm text-white hover:bg-black/80 disabled:opacity-50 lg:px-10 lg:text-base"
              href="/shop"
            >
              Return to shop
            </Link>
          </div>
        </div>
      </main>
    );

  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },

              { title: 'Cart', href: '#' },
            ]}
          />
        </div>
        <div className="mb-6">
          <h1 className="font-integral-bold text-4xl">Cart</h1>
        </div>
        <div className="pb-12 lg:grid lg:grid-cols-12 lg:gap-x-5 lg:pb-20">
          <div className="mb-6 lg:col-span-7 lg:mb-0">
            <div className="rounded-2.5xl border border-black/10 p-3.5 lg:px-6 lg:py-4">
              <ul>
                {cart.items.map((item) => {
                  return (
                    <li
                      className="relative w-full border-b border-black/10 py-4 first:pt-0 last:border-b-0 last:pb-0"
                      key={item.id}
                    >
                      <div className="flex gap-x-3.5 lg:gap-x-4">
                        <div className="relative h-32 w-32 flex-none rounded-lg border border-black/10">
                          <Image
                            src={item.images[0].thumbnail}
                            alt={item.name}
                            fill
                            className="h-full w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col gap-y-3">
                            <div className="flex justify-between gap-x-6">
                              <p className="font-satoshi-bold text-base font-bold text-black lg:text-xl">
                                <Link href={`/product/${item.id}`}>{item.name}</Link>
                              </p>
                              <CartRemoveBtn itemKey={item.key} />
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="font-satoshi-bold text-xl leading-none font-bold text-black lg:text-2xl">
                                {formatPrice(item.prices.sale_price, item.prices)}
                              </p>
                              <CartQuantityControl
                                inputClassName="px-4"
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
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2.5xl border border-black/10 px-6 py-4">
              <div className="flex flex-col gap-y-6">
                <h3 className="font-satoshi-bold text-2xl font-bold text-black">Order Summary</h3>
                <div>
                  <div className="mb-3 flex flex-col gap-y-3 border-b border-black/10 pb-3">
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
                    {cart.coupons.length > 0 &&
                      cart.coupons.map((coupon, index) => {
                        return (
                          <div className="flex justify-between" key={index}>
                            <p className="text-lg text-black/60">Coupon: {coupon.code}</p>
                            <p className="flex items-center gap-x-2 font-satoshi-bold text-lg font-bold">
                              <span className="text-[#FF3333]">
                                -
                                {formatPrice(coupon.totals.total_discount, {
                                  currency_minor_unit: cart.totals.currency_minor_unit,
                                  currency_decimal_separator: cart.totals.currency_decimal_separator,
                                  currency_thousand_separator: cart.totals.currency_thousand_separator,
                                  currency_prefix: cart.totals.currency_prefix,
                                  currency_suffix: cart.totals.currency_suffix,
                                })}
                              </span>
                              <CouponRemove code={coupon.code} />
                            </p>
                          </div>
                        );
                      })}
                    {cart.shipping_rates[0].shipping_rates.length > 0 &&
                      cart.shipping_rates.map((rate, index) => {
                        return (
                          <div className="flex flex-col" key={index}>
                            <p className="text-lg text-black/60">Shipping</p>
                            {rate.shipping_rates.length > 1 ? (
                              <ShippingRates rate={rate} />
                            ) : (
                              <ul className="mt-3 flex flex-col gap-y-2">
                                {rate.shipping_rates.map((shippingRate, index) => {
                                  return (
                                    <li className="flex items-center gap-x-2" key={index}>
                                      <p className="flex flex-1 justify-between">
                                        <span className="text-base text-black/60">{shippingRate.name}:</span>
                                        <span className="font-satoshi-bold text-base font-bold text-black">
                                          {formatPrice(shippingRate.price, {
                                            currency_minor_unit: shippingRate.currency_minor_unit,
                                            currency_decimal_separator: shippingRate.currency_decimal_separator,
                                            currency_thousand_separator: shippingRate.currency_thousand_separator,
                                            currency_prefix: shippingRate.currency_prefix,
                                            currency_suffix: shippingRate.currency_suffix,
                                          })}
                                        </span>
                                      </p>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    {cart.totals.tax_lines.length > 0 &&
                      cart.totals.tax_lines.map((tax, index) => {
                        return (
                          <div className="flex justify-between" key={index}>
                            <p className="text-lg text-black/60">{tax.name}</p>
                            <p className="font-satoshi-bold text-lg font-bold text-black">
                              {formatPrice(tax.price, {
                                currency_minor_unit: cart.totals.currency_minor_unit,
                                currency_decimal_separator: cart.totals.currency_decimal_separator,
                                currency_thousand_separator: cart.totals.currency_thousand_separator,
                                currency_prefix: cart.totals.currency_prefix,
                                currency_suffix: cart.totals.currency_suffix,
                              })}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg text-black/60">Total</p>
                    <p className="font-satoshi-bold text-lg font-bold text-black">
                      {formatPrice(cart.totals.total_price, {
                        currency_minor_unit: cart.totals.currency_minor_unit,
                        currency_decimal_separator: cart.totals.currency_decimal_separator,
                        currency_thousand_separator: cart.totals.currency_thousand_separator,
                        currency_prefix: cart.totals.currency_prefix,
                        currency_suffix: cart.totals.currency_suffix,
                      })}
                    </p>
                  </div>
                </div>
                <div>
                  <ApplyCoupon />
                </div>
                <div>
                  <Button
                    onClick={() => {
                      window.location.href = `${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/checkout`;
                    }}
                    className="w-full gap-x-3 py-4.5 text-sm font-medium lg:py-5 lg:text-base"
                  >
                    Go to checkout <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {cart.cross_sells.length > 0 && <CrossSellProducts products={cart.cross_sells} />}
      </div>
    </main>
  );
}
