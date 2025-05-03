import { Params } from '@/types';
import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/breadcrumb';
import { Product } from '@/features/product/types';
import { calculateDiscountPercentage } from '@/utlis';
import { Rating } from '@/features/product/components/rating';
import { SingleProductTabs } from '@/features/single-product/components/single-product-tabs';
import { RelatedProducts } from '@/features/single-product/components/related-products';
import { Suspense } from 'react';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';

export default async function ProductName({ params }: { params: Params<{ slug: string }> }) {
  const { slug } = await params;

  const response = await apiFetchWithoutAuth(`/wc/store/v1/products/${slug}`);
  // const settingsResponse = await apiFetch(`/wc/v3/settings/products`);

  if (!response.ok) {
    notFound();
  }

  const product = (await response.json()) as Product;
  // const settingsResult = (await settingsResponse.json()) as { woocommerce_enable_reviews: { value: 'yes' | 'no' } };

  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },
              { title: 'Categories', href: '/categories' },
              ...product.categories.map((category) => ({ title: category.name, href: `/categories/${category.slug}` })),
              { title: product.name, href: '#' },
            ]}
          />
        </div>
        <div className="mb-[50px] grid grid-cols-12 lg:mb-20">
          <div className="col-span-6"></div>
          <div className="col-span-6">
            <h2 className="mb-3 font-integral-bold text-2xl leading-[1.17] lg:mb-3.5 lg:text-[2.5rem]">
              {product.name}
            </h2>
            {!isNaN(Number(product.average_rating)) && Number(product.average_rating) > 0 ? (
              <div className="mb-3 flex items-center gap-x-3.5 lg:mb-3.5">
                <Rating
                  fullStarClassName={'lg:w-6 lg:h-6 w-4 h-4'}
                  halfStarClassName={'lg:w-[11px] lg:h-[22px] w-2 h-4'}
                  averageRating={isNaN(Number(product.average_rating)) ? 0 : Number(product.average_rating)}
                />
                <p className="mt-0.5 font-satoshi text-sm text-black">
                  <span>{Number(product.average_rating)}/</span>
                  <span className="text-black/60">5</span>
                </p>
              </div>
            ) : null}
            <div className="mb-3 flex items-center gap-x-3">
              <p
                className="flex items-center gap-x-2.5 font-satoshi-bold text-2xl leading-none lg:text-[2rem] [&_del]:order-2 [&_del]:text-black/40 [&_ins]:order-1 [&_ins]:text-black [&_ins]:no-underline"
                dangerouslySetInnerHTML={{ __html: product.price_html }}
              ></p>
              {['external', 'simple'].includes(product.type) &&
                (product.on_sale ? (
                  <span className="rounded-full bg-[rgba(255,51,51,.10)] px-3 py-1.5 font-satoshi-medium text-sm text-[#FF3333] lg:px-3.5 lg:text-base">
                    -{calculateDiscountPercentage(product.prices)}%
                  </span>
                ) : null)}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: product.short_description }}
              className="mb-6 [&_p]:font-satoshi [&_p]:text-sm [&_p]:leading-[1.43] [&_p]:text-black/60 [&_p]:lg:text-base [&_p]:lg:leading-[1.38]"
            />
            <div className="flex gap-x-3 border-t border-black/10 pt-6 lg:gap-x-5">
              <button className="w-full cursor-pointer rounded-[62px] bg-black py-3 text-white lg:py-4">
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="mb-[50px] lg:mb-20">
          <SingleProductTabs isReviewEnabled={true} product={product} />
        </div>

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
          <RelatedProducts ids={product.extensions['next-woo-helper-custom-product-data'].related_ids} />
        </Suspense>
      </div>
    </main>
  );
}
