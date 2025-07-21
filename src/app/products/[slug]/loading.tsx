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
        <div className="mb-[50px] grid lg:mb-20 lg:grid-cols-2 lg:gap-x-10">
          <div className="lg:h-[500px] h-[300px] rounded-[20px] animate-pulse bg-gray-200"></div>
          <div>
            <div className="h-12 w-full mb-3 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-9 w-full mb-3 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-7 w-full mb-3 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-[1px] w-full border border-black/10 my-6"></div>
            <div className="h-12 w-full mb-3 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-9 w-full mb-3 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-7 w-full mb-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-20 w-full bg-gray-200 animate-pulse rounded-full"></div>
          </div>
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
