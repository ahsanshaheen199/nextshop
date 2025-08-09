'use client';

import { Button } from '@/components/form/button';
import { ProductResponseItem } from '@/types/product-response';

type Props = {
  product: ProductResponseItem;
};

export function ExternalProductAddToCart({ product }: Props) {
  return (
    <div className="pt-6">
      <Button
        onClick={() => {
          window.open(product.add_to_cart.url, '_blank');
        }}
        type="button"
        className="w-2/3 cursor-pointer rounded-[62px] bg-black py-3 text-white disabled:cursor-not-allowed disabled:bg-black/70 lg:py-4"
      >
        {product.add_to_cart.text}
      </Button>
    </div>
  );
}
