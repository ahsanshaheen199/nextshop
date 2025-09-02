import { Categories } from '@/features/shop/components/categories';
import { CategoriesSkeleton } from '@/features/shop/components/categories-skeleton';
import { PriceRange } from '@/features/shop/components/price-range';
import { PriceRangeSkeleton } from '@/features/shop/components/price-range-skeleton';
import { Suspense } from 'react';

export function FilterSidebar() {
  return (
    <div className="divide-y divide-black/10">
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<PriceRangeSkeleton />}>
        <PriceRange />
      </Suspense>
    </div>
  );
}
