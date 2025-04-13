import { Breadcrumb } from '@/components/breadcrumb';
import { SearchParams } from '@/types';
import { ProductCountWithOrdering } from '@/features/product/components/product-count-with-ordering';
import { Suspense } from 'react';
import { ProductListWithPagination } from '@/features/product/components/product-list-with-pagination';

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchParamsValue = await searchParams;
  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 py-6">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },
              { title: 'Shop', href: '#' },
            ]}
          />
        </div>

        <div className="grid grid-cols-4 gap-x-5">
          <div></div>

          <div className="col-span-3">
            <ProductCountWithOrdering searchParamsValue={searchParamsValue} />
            <Suspense fallback={'loading....'}>
              <ProductListWithPagination searchParamsValue={searchParamsValue} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
