import { ProductItem } from '@/features/product/components/product-item';
import { Cart } from '@/types/cart';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

export function CrossSellProducts({ products }: { products: Cart['crossSells'] }) {
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
    <div className="pb-12 lg:pb-20">
      <h2 className="mb-10 text-center font-integral-bold text-[32px] leading-[36px] text-black lg:mb-14 lg:text-5xl">
        You might also like
      </h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="touch-pin-zoom -ml-5 flex touch-pan-y">
          {products.map((item) => {
            return (
              <div
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-1/2 translate-x-0 translate-y-0 translate-z-0 transform pl-5 select-none lg:basis-1/4"
              >
                <ProductItem product={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
