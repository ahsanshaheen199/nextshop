'use client';

import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { type PriceRange } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import * as Slider from '@radix-ui/react-slider';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useTransition, useCallback, useRef, useEffect } from 'react';

export function PriceRange() {
  const [open, setOpen] = useState(true);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [maxPrice, setMaxPrice] = useState<number>(
    searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 0
  );
  const [minPrice, setMinPrice] = useState<number>(
    searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0
  );
  const router = useRouter();
  const pathname = usePathname();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedUpdate = useCallback(
    (minPrice: number, maxPrice: number) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        startTransition(() => {
          const params = new URLSearchParams(searchParams);
          if (params.has('maxPrice')) {
            params.set('maxPrice', maxPrice.toString());
          } else {
            params.append('maxPrice', maxPrice.toString());
          }
          if (params.has('minPrice')) {
            params.set('minPrice', minPrice.toString());
          } else {
            params.append('minPrice', minPrice.toString());
          }
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      }, 500);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const { data: priceRange } = useSuspenseQuery<{ price_range: PriceRange }>({
    queryKey: ['price-range'],
    queryFn: () => {
      return apiFetchWithoutAuth('/wc/store/v1/products/collection-data?calculate_price_range=true').then((res) =>
        res.json()
      );
    },
  });

  useEffect(() => {
    setMaxPrice(Number(priceRange?.price_range?.max_price) / 100);
  }, [priceRange]);

  return (
    <div className="py-5">
      <div className={`flex cursor-pointer items-center justify-between`} onClick={() => setOpen(!open)}>
        <h3 className="font-satoshi-bold text-xl text-black">Price</h3>
        <svg
          className={`transition-transform duration-250 ease-linear ${open ? '' : 'rotate-180'}`}
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.4694 9.96945L7.4694 4.96945C7.53908 4.89953 7.62187 4.84405 7.71304 4.8062C7.8042 4.76834 7.90194 4.74886 8.00065 4.74886C8.09936 4.74886 8.1971 4.76834 8.28827 4.8062C8.37943 4.84405 8.46222 4.89953 8.5319 4.96945L13.5319 9.96945C13.6728 10.1103 13.752 10.3014 13.752 10.5007C13.752 10.7 13.6728 10.8911 13.5319 11.0319C13.391 11.1728 13.1999 11.252 13.0007 11.252C12.8014 11.252 12.6103 11.1728 12.4694 11.0319L8.00003 6.56257L3.53065 11.0326C3.38976 11.1735 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1735 2.46815 11.0326C2.32726 10.8917 2.2481 10.7006 2.2481 10.5013C2.2481 10.3021 2.32726 10.111 2.46815 9.97007L2.4694 9.96945Z"
            fill="black"
          />
        </svg>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-250 ease-linear ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className={`overflow-hidden transition-[padding] duration-250 ease-linear ${open ? 'pt-3' : 'pt-0'}`}>
          <Slider.Root
            value={[minPrice, maxPrice]}
            onValueChange={(number: number[]) => {
              const minPrice = number[0];
              const maxPrice = number[1];
              setMinPrice(minPrice);
              setMaxPrice(maxPrice);
              debouncedUpdate(minPrice, maxPrice);
            }}
            className="relative flex h-2 w-full touch-none items-center select-none"
            max={Number(priceRange?.price_range?.max_price ?? 0) / 100}
            min={0}
            name="maxPrice"
          >
            <Slider.Track className="relative h-1.5 flex-grow rounded-2.5xl bg-[#F0F0F0]">
              <Slider.Range className="absolute h-full rounded-2.5xl bg-black" />
            </Slider.Track>
            <Slider.Thumb
              data-number={minPrice}
              className="relative block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px_rgba(127,136,169,.58)] focus:shadow-[0_0_0_7px_rgba(127,136,169,.29)] focus:outline-none focus:after:absolute focus:after:-top-12 focus:after:left-1/2 focus:after:flex focus:after:h-8 focus:after:w-12 focus:after:-translate-x-1/2 focus:after:items-center focus:after:justify-center focus:after:rounded-md focus:after:bg-white focus:after:text-sm focus:after:font-medium focus:after:text-black focus:after:shadow-[0_0_20px_rgba(0,0,0,0.10)] focus:after:content-[attr(data-number)]"
            ></Slider.Thumb>
            <Slider.Thumb
              data-number={maxPrice}
              className="relative block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px_rgba(127,136,169,.58)] focus:shadow-[0_0_0_7px_rgba(127,136,169,.29)] focus:outline-none focus:after:absolute focus:after:-top-12 focus:after:left-1/2 focus:after:flex focus:after:h-8 focus:after:w-12 focus:after:-translate-x-1/2 focus:after:items-center focus:after:justify-center focus:after:rounded-md focus:after:bg-white focus:after:text-sm focus:after:font-medium focus:after:text-black focus:after:shadow-[0_0_20px_rgba(0,0,0,0.10)] focus:after:content-[attr(data-number)]"
            ></Slider.Thumb>
          </Slider.Root>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-black">{priceRange?.price_range?.currency_symbol}0</span>
            <span className="text-sm text-black">
              {priceRange?.price_range?.currency_symbol}
              {Number(priceRange?.price_range?.max_price) / 100}
            </span>
          </div>
          {searchParams.get('maxPrice') || searchParams.get('minPrice') ? (
            <div className="mt-3 flex justify-end gap-4">
              <button
                disabled={isPending}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('maxPrice');
                  params.delete('minPrice');
                  setMaxPrice(Number(priceRange?.price_range?.max_price) / 100);
                  setMinPrice(0);
                  startTransition(() => {
                    router.push(`${pathname}?${params.toString()}`, { scroll: false });
                  });
                }}
                className="cursor-pointer rounded bg-black px-2 py-1 text-xs text-white uppercase disabled:cursor-not-allowed disabled:bg-gray-200"
              >
                clear
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
