import { Categories } from '@/features/shop/components/categories';
import { CategoriesSkeleton } from '@/features/shop/components/categories-skeleton';
import { PriceRangeFilter } from '@/features/shop/components/price-range';
import { PriceRangeSkeleton } from '@/features/shop/components/price-range-skeleton';
import { AttributeFilter } from '@/features/shop/components/attribute-filter';
import { AttributeFilterSkeleton } from '@/features/shop/components/attribute-filter-skeleton';
import * as Accordion from '@radix-ui/react-accordion';
import { Suspense } from 'react';

export async function FilterSidebar() {
  const defaultOpenValues = ['categories', 'price'];

  return (
    <Accordion.Root type="multiple" defaultValue={defaultOpenValues} className="divide-y divide-black/10">
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<PriceRangeSkeleton />}>
        <PriceRangeFilter />
      </Suspense>
      <Suspense fallback={<AttributeFilterSkeleton />}>
        <AttributeFilter />
      </Suspense>
    </Accordion.Root>
  );
}
