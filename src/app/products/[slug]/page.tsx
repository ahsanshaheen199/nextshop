import { Params } from '@/types';
import { RelatedProducts } from '@/features/single-product/components/related-products';
import { Fragment, Suspense } from 'react';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';
import { SingleProductBreadcrumb } from '@/features/single-product/components/single-product-breadcrumb';
import { BreadcrumbSkeleton } from '@/components/skeleton/breadcrumb-skeleton';
import { ProductImages } from '@/features/single-product/components/product-images';
import { ProductTitle } from '@/features/single-product/components/product-title';
import { ProductRating } from '@/features/single-product/components/product-rating';
import { ProductOnSale } from '@/features/single-product/components/product-on-sale';
import { ProductShortDescription } from '@/features/single-product/components/product-short-description';
import { ProductTabsWrapper } from '@/features/single-product/components/product-tabs-wrapper';
import { TabsSkeleton } from '@/features/single-product/components/tabs-skeleton';
import { AddToCart } from '@/features/single-product/components/add-to-cart';

export default async function SingleProductPage({ params }: { params: Params<{ slug: string }> }) {
  return (
    <main>
      <div className="container">
        <Suspense
          fallback={
            <div className="border-t border-black/10 pt-6 pb-9">
              <BreadcrumbSkeleton />
            </div>
          }
        >
          <SingleProductBreadcrumb params={params} />
        </Suspense>
        <div className="mb-[50px] grid lg:mb-20 lg:grid-cols-2 lg:gap-x-10">
          <div className="col-span-1">
            <Suspense
              fallback={<div className="h-[300px] animate-pulse rounded-[20px] bg-gray-200 lg:h-[500px]"></div>}
            >
              <ProductImages params={params} />
            </Suspense>
          </div>

          <div className="col-span-1 mt-5 lg:mt-0">
            <Suspense fallback={<div className="mb-3 h-12 w-full animate-pulse rounded bg-gray-200"></div>}>
              <ProductTitle params={params} />
            </Suspense>
            <Suspense fallback={<div className="mb-3 h-6 w-full animate-pulse rounded bg-gray-200"></div>}>
              <ProductRating params={params} />
            </Suspense>
            <Suspense fallback={<div className="mb-3 h-11 w-full animate-pulse rounded bg-gray-200"></div>}>
              <ProductOnSale params={params} />
            </Suspense>
            <Suspense
              fallback={
                <Fragment>
                  <div className="mb-6 h-8 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="my-6 h-[1px] w-full border border-black/10"></div>
                </Fragment>
              }
            >
              <ProductShortDescription params={params} />
            </Suspense>
            <Suspense
              fallback={
                <Fragment>
                  <div className="mb-3 h-12 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-3 h-9 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-6 h-7 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="h-20 w-full animate-pulse rounded-full bg-gray-200"></div>
                </Fragment>
              }
            >
              <AddToCart params={params} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<TabsSkeleton />}>
          <ProductTabsWrapper params={params} />
        </Suspense>

        <Suspense
          fallback={
            <div className="mb-[14px] lg:mb-11">
              <div className="mb-10 lg:mb-12">
                <div className="mx-auto h-12 w-1/2 animate-pulse rounded bg-gray-200"></div>
              </div>
              <ProductSkeleton />
            </div>
          }
        >
          <RelatedProducts params={params} />
        </Suspense>
      </div>
    </main>
  );
}
