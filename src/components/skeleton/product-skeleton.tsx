'use client';

import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function ProductSkeleton({ count = 4 }: { count?: number }) {
  const pathname = usePathname();

  return (
    <div
      className={twMerge('md:grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-4', pathname === '/shop' && 'lg:grid-cols-3')}
    >
      {Array.from({ length: count }, (_, i) => {
        return (
          <div key={i} className="mb-5">
            <div className="h-[280px] w-full animate-pulse rounded-[20px] bg-gray-200"></div>
            <div className="p-4">
              <div className="mx-auto mb-2 h-6 w-[160px] animate-pulse rounded-[20px] bg-gray-200"></div>
              <div className="mx-auto h-5 w-[130px] animate-pulse rounded-[20px] bg-gray-200"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
