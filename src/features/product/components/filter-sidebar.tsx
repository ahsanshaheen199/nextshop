import { Categories } from '@/features/shop/components/categories';
import { CategoriesSkeleton } from '@/features/shop/components/categories-skeleton';
import { PriceRangeFilter } from '@/features/shop/components/price-range';
import { PriceRangeSkeleton } from '@/features/shop/components/price-range-skeleton';
import * as Accordion from '@radix-ui/react-accordion';
import { Suspense } from 'react';

export function FilterSidebar() {
  return (
    <Accordion.Root type="multiple" defaultValue={['categories', 'price']} className="divide-y divide-black/10">
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<PriceRangeSkeleton />}>
        <PriceRangeFilter />
      </Suspense>
    </Accordion.Root>
  );
}
