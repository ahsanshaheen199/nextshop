'use client';

import { Quantity } from '@/components/quantity';
import { Fragment, useActionState, useEffect, useState } from 'react';
import { useCart } from '@/providers/cart-provider';
import { addToCart } from '@/features/cart/actions';
import { Button } from '@/components/form/button';
import { ProductResponseItem } from '@/types/product-response';
import { toast } from '@/components/toast';

type Props = {
  product: ProductResponseItem;
};

export function SimpleProductAddToCart({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [state, formAction, isPending] = useActionState(addToCart, null);
  const addItemAction = formAction.bind(null, { productId: product.id.toString(), quantity });
  const { addCartItem } = useCart();

  if (product.is_in_stock === false) {
    return <p className="pt-6 text-left text-base text-red-500">Product is out of stock</p>;
  }

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        type: 'error',
      });
    }
  }, [state]);

  return (
    <Fragment>
      <div className="flex gap-x-3 pt-6 lg:gap-x-5">
        <Quantity
          value={quantity}
          onIncrement={() => {
            if (typeof product?.low_stock_remaining === 'number' && quantity + 1 > product.low_stock_remaining) {
              return;
            }
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
              if (typeof product?.low_stock_remaining === 'number' && value > product.low_stock_remaining) {
                return;
              }
              setQuantity(value);
            }
          }}
        />
        <form
          className="flex-1"
          action={async () => {
            addCartItem(product.id.toString(), quantity, [], product);
            await addItemAction();
          }}
        >
          <Button
            isLoading={isPending}
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer rounded-[62px] bg-black py-3 text-white disabled:cursor-not-allowed disabled:bg-black/70 lg:py-4"
          >
            Add to cart
          </Button>
        </form>
      </div>
      <div className="pt-6">
        <p className="text-left text-base text-black">
          {product?.low_stock_remaining && product.low_stock_remaining > 0
            ? `Only ${product.low_stock_remaining} left in stock`
            : ''}
        </p>
      </div>
    </Fragment>
  );
}
