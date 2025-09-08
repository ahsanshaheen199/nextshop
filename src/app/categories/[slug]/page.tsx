import { Breadcrumb } from '@/components/breadcrumb';
import { ProductCountWithOrderingSkeleton } from '@/components/skeleton/product-count-with-ordering-skeleton';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';
import { FilterSidebar } from '@/features/product/components/filter-sidebar';
import { ProductCountWithOrdering } from '@/features/product/components/product-count-with-ordering';
import { ProductLayoutContextProvider } from '@/features/product/components/product-layout-context';
import { ProductListWithPagination } from '@/features/product/components/product-list-with-pagination';
import { Suspense } from 'react';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { slug } = await params;
  const searchParamsValue = await searchParams;

  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 py-6">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },
              { title: 'Categories', href: '/categories' },
              { title: slug, href: '#' },
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
              <Suspense fallback={<ProductCountWithOrderingSkeleton />}>
                <ProductCountWithOrdering searchParamsValue={searchParamsValue} category={slug} />
              </Suspense>
              <Suspense fallback={<ProductSkeleton count={9} />}>
                <ProductListWithPagination searchParamsValue={searchParamsValue} category={slug} />
              </Suspense>
            </ProductLayoutContextProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
