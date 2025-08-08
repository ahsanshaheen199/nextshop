'use client';

import { ProductItem } from '@/features/product/components/product-item';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import { ProductResponseItem } from '@/types/product-response';

export function RelatedProductsCarousel({ products }: { products: ProductResponseItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 'auto',
      loop: true,
    },
    [Autoplay({ playOnInit: false, delay: 6000 })]
  );

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    autoplay.play();
  }, [emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="touch-pin-zoom -ml-5 flex touch-pan-y">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-0 shrink-0 grow-0 basis-1/2 translate-x-0 translate-y-0 translate-z-0 transform pl-5 select-none lg:basis-1/4"
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProductsCarousel;
