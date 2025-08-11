'use client';

import { ProductResponseItem } from '@/types/product-response';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/utlis';
import { Quantity } from '@/components/quantity';
import { Button } from '@/components/form/button';
import { Fragment, useState, useTransition } from 'react';
import { useCart } from '@/providers/cart-provider';
import { addGroupedProductsToCart } from '@/features/cart/actions';
import { toast } from '@/components/toast';

type Props = {
  products: ProductResponseItem[];
};

export function GroupedProducts({ products }: Props) {
  const { addCartItem } = useCart();
  const [data, setData] = useState<{ [key: number]: { product: ProductResponseItem; quantity: number } }>(
    products.reduce(
      (acc, product) => {
        acc[product.id] = { product, quantity: 0 };
        return acc;
      },
      {} as { [key: number]: { product: ProductResponseItem; quantity: number } }
    )
  );
  const [isPending, startTransition] = useTransition();

  return (
    <Fragment>
      <div className="my-6 rounded-2.5xl border border-black/10 p-3.5 lg:p-4">
        <ul>
          {products.map((product) => {
            return (
              <li
                className="relative w-full border-b border-black/10 py-4 first:pt-0 last:border-b-0 last:pb-0"
                key={product.id}
              >
                <div className="flex gap-x-3.5 lg:gap-x-4">
                  <div className="relative h-20 w-20 flex-none rounded-lg border border-black/10">
                    <Image
                      src={product.images[0].thumbnail}
                      alt={product.name}
                      fill
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-y-3">
                      <div className="flex justify-between gap-x-6">
                        <p className="font-satoshi-bold text-base font-bold text-black">
                          <Link href={`/products/${product.id}`}>{product.name}</Link>
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-satoshi-bold text-xl leading-none font-bold text-black">
                            {formatPrice(product.prices.sale_price, product.prices)}
                          </p>
                          <p className="text-left text-base text-black">
                            {product?.low_stock_remaining && product.low_stock_remaining > 0
                              ? `Only ${product.low_stock_remaining} left in stock`
                              : ''}
                          </p>
                        </div>

                        {product.is_in_stock ? (
                          <Quantity
                            iconClassName="h-4 w-4"
                            className="max-w-[100px] px-3.5 py-2 lg:min-w-32 lg:px-5 lg:py-3"
                            value={data[product.id]?.quantity ?? 1}
                            onValueChange={(value) => {
                              if (isNaN(value) || value < 1) {
                                setData((prev) => {
                                  const newData = { ...prev };
                                  newData[product.id] = { product, quantity: 0 };
                                  return newData;
                                });
                              } else {
                                if (
                                  typeof product?.low_stock_remaining === 'number' &&
                                  value > product.low_stock_remaining
                                ) {
                                  return;
                                }
                                setData((prev) => {
                                  const newData = { ...prev };
                                  newData[product.id] = { product, quantity: value };
                                  return newData;
                                });
                              }
                            }}
                            onIncrement={() => {
                              if (
                                typeof product?.low_stock_remaining === 'number' &&
                                data[product.id]?.quantity + 1 > product.low_stock_remaining
                              ) {
                                return;
                              }
                              setData((prev) => {
                                const newData = { ...prev };
                                newData[product.id] = { product, quantity: data[product.id]?.quantity + 1 };
                                return newData;
                              });
                            }}
                            onDecrement={() => {
                              if (data[product.id]?.quantity > 1) {
                                setData((prev) => {
                                  const newData = { ...prev };
                                  newData[product.id] = { product, quantity: data[product.id]?.quantity - 1 };
                                  return newData;
                                });
                              } else {
                                setData((prev) => {
                                  const newData = { ...prev };
                                  newData[product.id] = { product, quantity: 1 };
                                  return newData;
                                });
                              }
                            }}
                          />
                        ) : (
                          <p className="text-left text-base text-red-500">Out of stock</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        onClick={async () => {
          startTransition(async () => {
            Object.entries(data).forEach(([key, value]) => {
              if (value.quantity > 0) {
                addCartItem(key, value.quantity, [], value.product);
              }
            });
            const result = await addGroupedProductsToCart(
              null,
              Object.entries(data)
                .map(([key, value]) => {
                  if (value.quantity > 0) {
                    return {
                      id: Number(key),
                      quantity: value.quantity,
                    };
                  }
                })
                .filter(Boolean) as { id: number; quantity: number }[]
            );

            if (result?.error) {
              toast({
                title: 'Error',
                description: result.error,
                type: 'error',
              });
            }
          });
        }}
        disabled={isPending}
        isLoading={isPending}
        type="button"
        className="w-2/3 cursor-pointer rounded-[62px] bg-black py-3 text-white disabled:cursor-not-allowed disabled:bg-black/70 lg:py-4"
      >
        Add to cart
      </Button>
    </Fragment>
  );
}
