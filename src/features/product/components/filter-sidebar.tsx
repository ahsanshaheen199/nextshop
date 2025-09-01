import { Categories } from '@/features/shop/components/categories';
import { CategoriesSkeleton } from '@/features/shop/components/categories-skeleton';
import { Suspense } from 'react';

export function FilterSidebar() {
  return (
    <div>
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
    </div>
  );
}
