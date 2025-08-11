'use client';

import { Button } from '@/components/form/button';
import { Quantity } from '@/components/quantity';
import { ProductResponseItem } from '@/types/product-response';
import { useActionState, useEffect, useMemo, useState, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';
import { getVariableProductVariation } from '../actions';
import { addToCart } from '@/features/cart/actions';
import { useCart } from '@/providers/cart-provider';
import { useProduct, useUpdateURL } from '@/providers/product-provider';
import { formatPrice } from '@/utlis';

type Props = {
  product: ProductResponseItem;
};

export function VariableProductAddToCart({ product }: Props) {
  const updateURL = useUpdateURL();
  const { selectedVariation, setSelectedVariation, updateOption, optimisticOptions, removeOption } = useProduct();
  const [quantity, setQuantity] = useState(0);

  const [state, formAction, formActionPending] = useActionState(addToCart, null);
  const addItemAction = formAction.bind(null, {
    productId: product.id.toString(),
    quantity,
    variation: Object.entries(optimisticOptions).map(([attribute, value]) => ({
      attribute,
      value: value as string,
    })),
  });
  const { addCartItem } = useCart();
  const [isPending, startTransition] = useTransition();

  const foundVariation = useMemo(() => {
    return product.variations.find((variation) =>
      variation.attributes.every((attribute) => optimisticOptions[attribute.name] === attribute.value)
    );
  }, [optimisticOptions]);

  useEffect(() => {
    if (foundVariation) {
      getVariableProductVariation(product.id, foundVariation.id)
        .then((data) => {
          setSelectedVariation(data);
        })
        .catch(() => {
          setSelectedVariation(undefined);
        });
    } else {
      setSelectedVariation(undefined);
    }
  }, [foundVariation]);

  return (
    <div className="divide-y divide-black/10">
      {product.attributes
        .filter((attribute) => attribute.has_variations)
        .map((attribute) => {
          return (
            <div className="py-4" key={attribute.id}>
              <p className="mb-3 text-sm text-black/60 lg:text-base">{attribute.name}</p>
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {attribute.terms.map((term) => {
                  return (
                    <div
                      key={term.id}
                      onClick={() => {
                        startTransition(() => {
                          const newOptions = updateOption(attribute.name, term.slug);
                          updateURL(newOptions);
                        });
                      }}
                      className={twMerge(
                        'cursor-pointer rounded-[62px] bg-[#F0F0F0] px-5 py-2.5 text-sm text-black/60 hover:bg-black hover:text-white lg:px-6 lg:py-3 lg:text-base',
                        optimisticOptions[attribute.name] === term.slug && 'bg-black text-white'
                      )}
                    >
                      {term.name}
                    </div>
                  );
                })}
                {optimisticOptions[attribute.name] && (
                  <button
                    type="button"
                    className="cursor-pointer text-sm text-black/60"
                    onClick={() => {
                      startTransition(() => {
                        const newOptions = removeOption(attribute.name);
                        updateURL(newOptions);
                      });
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          );
        })}
      {selectedVariation && (
        <div className="flex items-center justify-between py-4">
          {selectedVariation?.stock_quantity && (
            <p className="text-left text-base text-black">Only {selectedVariation.stock_quantity} left in stock</p>
          )}
          {selectedVariation && (
            <p className="text-left text-base font-bold text-black lg:text-xl">
              {formatPrice(
                selectedVariation.price,
                {
                  ...product.prices,
                  currency_minor_unit: 0,
                },
                true
              )}
            </p>
          )}
        </div>
      )}

      {selectedVariation?.stock_status === 'outofstock' && (
        <div className="py-4">
          <p className="text-left text-red-500">Out of stock</p>
        </div>
      )}
      <div className="flex gap-x-3 py-6 lg:gap-x-5">
        {selectedVariation && (
          <Quantity
            value={quantity}
            onIncrement={() => {
              setQuantity(quantity + 1);
            }}
            onDecrement={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              } else {
                setQuantity(1);
              }
            }}
            onValueChange={(value) => {
              if (isNaN(value) || value < 1) {
                setQuantity(0);
              } else {
                setQuantity(value);
              }
            }}
          />
        )}
        <form
          className="flex-1"
          action={async () => {
            addCartItem(
              product.id.toString(),
              quantity,
              Object.entries(optimisticOptions).map(([attribute, value]) => ({
                attribute,
                value: value as string,
              })),
              product
            );
            await addItemAction();
          }}
        >
          <Button
            isLoading={formActionPending}
            disabled={
              !selectedVariation || selectedVariation?.stock_status === 'outofstock' || isPending || formActionPending
            }
            type="submit"
            className="w-full cursor-pointer rounded-[62px] bg-black py-3 text-white disabled:cursor-not-allowed disabled:bg-black/70 lg:py-4"
          >
            Add to cart
          </Button>
        </form>
      </div>
    </div>
  );
}
