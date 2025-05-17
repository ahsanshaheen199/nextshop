'use client';

import { Quantity } from '@/components/quantity';
import { useActionState, useState } from 'react';
import { Product } from '@/features/product/types';
import { useCart } from '@/providers/cart-provider';
import { addItem } from '@/features/cart/actions';

type Props = {
  product: Product;
};

export function AddToCart({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useCart();
  const [state, formAction, isPending] = useActionState(addItem, null);
  const addItemAction = formAction.bind(null, { product, variation: [], quantity });

  console.log(state);

  return (
    <>
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
      {product.type === 'simple' ? (
        <form
          className="flex-1"
          action={() => {
            addCartItem([], product, quantity);
            addItemAction();
          }}
        >
          <button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer rounded-[62px] bg-black py-3 text-white disabled:cursor-not-allowed disabled:bg-black/70 lg:py-4"
          >
            Add to cart
          </button>
        </form>
      ) : null}
    </>
  );
}
