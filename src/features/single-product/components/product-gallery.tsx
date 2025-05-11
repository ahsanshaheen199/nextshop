'use client';

import { Product } from '@/features/product/types';
import Image from 'next/image';
// import { SingleSlider } from './single-slider';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
// import Autoplay from 'embla-carousel-autoplay';

type Props = {
  product: Product;
};

export function ProductGallery({ product }: Props) {
  const images = product.images;
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    skipSnaps: false,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'x',
    breakpoints: {
      '(min-width: 1024px)': { axis: 'y'},
    }
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="flex lg:flex-row flex-col lg:gap-x-3.5">
      {images.length > 1 ? (
        <div className="lg:w-[120px] w-full lg:order-1 order-2 flex-none mt-5 lg:mt-0">
          <div className="relative">
            <div className="overflow-hidden lg:h-[500px] h-[110px]" ref={emblaThumbsRef}>
              <div className="h-full lg:block flex flex-row">
                {
                  product.images.map((image, index) => (
                    <div key={index} className={twMerge("lg:mb-3.5 mr-3.5 lg:mr-0 lg:h-1/4 h-full w-full basis-1/4 grow-0 shrink-0 rounded-[20px]", index === selectedIndex && 'border border-black')}>
                      <button className="w-full h-full flex" onClick={() => onThumbClick(index)}>
                        <Image width={150} height={170} loading='eager' className="rounded-[20px] h-full w-full object-cover" src={image.thumbnail} alt={image?.alt ?? product.name} sizes={image.sizes} />
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex-1 lg:order-2 order-1">
        <div className="relative">
          <div className="overflow-hidden lg:h-[500px] h-[300px]" ref={emblaMainRef}>
            <div className="h-full w-full flex">
              {
                product.images.map((image, index) => (
                  <div key={index} className="relative grow-0 shrink-0 basis-full h-full">
                    <Image width={500} height={500} src={image.src} alt={image?.alt ?? product.name} sizes={image.sizes} className="rounded-[20px] h-full w-full object-cover" />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
