'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProductResponseItem } from '@/types/product-response';

type Props = {
  product: ProductResponseItem;
};

export function ProductGallery({ product }: Props) {
  const images = product.images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    skipSnaps: false,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'x',
    breakpoints: {
      '(min-width: 1024px)': { axis: 'y' },
    },
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-3.5">
      {images.length > 1 ? (
        <div className="order-2 mt-5 w-full flex-none lg:order-1 lg:mt-0 lg:w-[120px]">
          <div className="relative">
            <div className="h-[110px] overflow-hidden lg:h-[500px]" ref={emblaThumbsRef}>
              <div className="flex h-full flex-row lg:block">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={twMerge(
                      'mr-3.5 h-full w-full shrink-0 grow-0 basis-1/4 rounded-[20px] lg:mr-0 lg:mb-3.5 lg:h-1/4',
                      index === selectedIndex && 'border border-black'
                    )}
                  >
                    <button className="flex h-full w-full" onClick={() => onThumbClick(index)}>
                      <Image
                        width={150}
                        height={170}
                        loading="eager"
                        className="h-full w-full rounded-[20px] object-cover"
                        src={image.thumbnail}
                        alt={image?.alt ?? product.name}
                        sizes={image.sizes}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="order-1 flex-1 lg:order-2">
        <div className="relative">
          <div className="h-[300px] overflow-hidden lg:h-[500px]" ref={emblaMainRef}>
            <div className="flex h-full w-full">
              {product.images.map((image, index) => (
                <div key={index} className="relative h-full shrink-0 grow-0 basis-full">
                  <Image
                    loading="eager"
                    width={500}
                    height={500}
                    src={image.src}
                    alt={image?.alt ?? product.name}
                    sizes={image.sizes}
                    className="h-full w-full rounded-[20px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
