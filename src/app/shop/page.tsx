import { Breadcrumb } from '@/components/breadcrumb';
import { SearchParams } from '@/types';
import { ProductCountWithOrdering } from '@/features/product/components/product-count-with-ordering';
import { Suspense } from 'react';
import { ProductListWithPagination } from '@/features/product/components/product-list-with-pagination';
import { ProductLayoutContextProvider } from '@/features/product/components/product-layout-context';
import { FilterSidebar } from '@/features/product/components/filter-sidebar';

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

        <div className="pb-20 xl:grid xl:grid-cols-4 xl:gap-x-5">
          <div className="hidden xl:block">
            <div className="rounded-[20px] border border-black/10 px-6 py-5">
              <FilterSidebar />
            </div>
          </div>

          <div className="col-span-3">
            <ProductLayoutContextProvider>
              <ProductCountWithOrdering searchParamsValue={searchParamsValue} />
              <Suspense fallback={'loading....'}>
                <ProductListWithPagination searchParamsValue={searchParamsValue} />
              </Suspense>
            </ProductLayoutContextProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
