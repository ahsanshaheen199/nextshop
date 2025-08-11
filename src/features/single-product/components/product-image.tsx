'use client';

import { ProductResponseItem } from '@/types/product-response';
import { useProduct } from '@/providers/product-provider';
import { ProductGallery } from './product-gallery';
import Image from 'next/image';

type Props = {
  product: ProductResponseItem;
};

export function ProductImage({ product }: Props) {
  const { selectedVariation } = useProduct();

  if (selectedVariation?.image?.src) {
    return (
      <div className="h-[300px] w-full lg:h-[500px]">
        <Image
          width={500}
          height={500}
          className="h-full w-full rounded-[20px] object-cover"
          src={selectedVariation.image.src}
          alt={selectedVariation.image.alt}
        />
      </div>
    );
  }

  return product.images.length > 1 ? (
    <ProductGallery product={product} />
  ) : (
    <div className="h-[300px] w-full lg:h-[500px]">
      <Image
        width={500}
        height={500}
        className="h-full w-full rounded-[20px] object-cover"
        src={product.images[0]?.src}
        alt={product.images[0]?.alt ?? product.name}
      />
    </div>
  );
}
