import { Product } from '@/features/product/types';
import Image from 'next/image';
import { SingleSlider } from './single-slider';

type Props = {
  product: Product;
};

export function ProductGallery({ product }: Props) {
  const images = product.images;

  return (
    <div className="flex h-full w-full flex-wrap lg:flex-nowrap lg:gap-x-3.5">
      {images.length > 1 ? (
        <div className="order-2 mt-3 flex h-full max-h-[110px] w-full gap-x-3 gap-y-3.5 overflow-hidden lg:order-1 lg:mt-0 lg:max-h-[500px] lg:max-w-[150px] lg:flex-col lg:gap-x-0">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square h-full w-full">
              <Image
                className="h-full w-full rounded-[20px] object-cover"
                fill
                src={image.thumbnail}
                alt={product.name}
                sizes={product.images[0].sizes}
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="order-1 h-full max-h-[300px] w-full overflow-hidden rounded-[20px] lg:order-2 lg:max-h-[500px]">
        <SingleSlider product={product} />
      </div>
    </div>
  );
}
