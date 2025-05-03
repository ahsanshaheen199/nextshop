import { BreadcrumbSkeleton } from '@/components/skeleton/breadcrumb-skeleton';
import { TabsSkeleton } from '@/features/single-product/components/tabs-skeleton';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';

export default function Loading() {
  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <BreadcrumbSkeleton />
        </div>
        <TabsSkeleton />

        <div className="mb-[14px] lg:mb-11">
          <div className="mb-10 lg:mb-12">
            <div className="mx-auto h-12 w-1/2 animate-pulse rounded bg-gray-200"></div>
          </div>
          <ProductSkeleton />
        </div>
      </div>
    </main>
  );
}
