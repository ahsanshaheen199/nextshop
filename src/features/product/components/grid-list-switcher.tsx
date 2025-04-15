'use client';

import { twMerge } from 'tailwind-merge';
import { useProductLayoutContext } from '@/features/product/components/product-layout-context';

export function GridListSwitcher() {
  const { layout, setLayout } = useProductLayoutContext();

  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <button
        onClick={() => {
          setLayout('grid');
        }}
        className={twMerge(
          'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#F0F0F0]',
          layout === 'grid' && 'bg-black text-white'
        )}
      >
        <svg
          fill="currentColor"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <rect x="3.25" y="1.75" width="1.5" height="12.5" rx="0.75" fill="currentColor"></rect>
          <rect x="7.25" y="1.75" width="1.5" height="12.5" rx="0.75" fill="currentColor"></rect>
          <rect x="11.25" y="1.75" width="1.5" height="12.5" rx="0.75" fill="currentColor"></rect>
        </svg>
      </button>
      <button
        onClick={() => {
          setLayout('list');
        }}
        className={twMerge(
          'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#F0F0F0]',
          layout === 'list' && 'bg-black text-white'
        )}
      >
        <svg
          fill="currentColor"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <rect
            x="15.25"
            y="4.25"
            width="1.5"
            height="12.5"
            rx="0.75"
            transform="rotate(90 15.25 4.25)"
            fill="currentColor"
          ></rect>
          <rect
            x="15.25"
            y="8.25"
            width="1.5"
            height="12.5"
            rx="0.75"
            transform="rotate(90 15.25 8.25)"
            fill="currentColor"
          ></rect>
          <rect
            x="15.25"
            y="12.25"
            width="1.5"
            height="12.5"
            rx="0.75"
            transform="rotate(90 15.25 12.25)"
            fill="currentColor"
          ></rect>
        </svg>
      </button>
    </div>
  );
}
