'use client';

import { Product } from '@/features/product/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  product: Product;
};

export function SingleSlider({ product }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => {
        return prev === product.images.length - 1 ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <div
      className="relative flex aspect-square h-full w-full transition-transform duration-500 ease-out"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
      {product.images.map((image, index) => (
        <Image
          width={530}
          height={530}
          key={index}
          className="h-full w-full rounded-[20px] object-cover"
          src={image.src}
          alt={product.name}
          sizes={product.images[0].sizes}
        />
      ))}
    </div>
  );
}
