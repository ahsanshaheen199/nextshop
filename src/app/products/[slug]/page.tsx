import { Params } from '@/types';
import { apiFetch, apiFetchWithoutAuth } from '@/lib/app-fetch';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/breadcrumb';
import { Product } from '@/features/product/types';
import { calculateDiscountPercentage } from '@/utlis';
import { Rating } from '@/features/product/components/rating';
import { SingleProductTabs } from '@/features/single-product/components/single-product-tabs';
import { RelatedProducts } from '@/features/single-product/components/related-products';
import { Suspense } from 'react';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';
import { ProductGallery } from '@/features/single-product/components/product-gallery';
import Image from 'next/image';
import { AddToCart } from '@/features/single-product/components/add-to-cart';

export default async function ProductName({ params }: { params: Params<{ slug: string }> }) {
  const { slug } = await params;

  const response = await apiFetchWithoutAuth(`/wc/store/v1/products/${slug}`);
  if (!response.ok) {
    notFound();
  }

  const product = (await response.json()) as Product;

  const settingsResponse = await apiFetch(`/wc/v3/settings/products`);

  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },
              ...product.categories.map((category) => ({ title: category.name, href: `/categories/${category.slug}` })),
              { title: product.name, href: '#' },
            ]}
          />
        </div>
        <div className="mb-[50px] grid lg:mb-20 lg:grid-cols-2 lg:gap-x-10">
          <div className="col-span-1">
            {product.images.length > 1 ? (
              <ProductGallery product={product} />
            ) : (
              <div className="h-[300px] w-full lg:h-[500px]">
                <Image
                  width={500}
                  height={500}
                  className="h-full w-full rounded-[20px] object-cover"
                  src={product.images[0]?.src}
                  alt={product.images[0]?.alt}
                />
              </div>
            )}
          </div>
          <div className="col-span-1 mt-5 lg:mt-0">
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
              <AddToCart product={product} />
            </div>
          </div>
        </div>

        <div className="mb-[50px] lg:mb-20">
          <SingleProductTabs
            settingsResult={
              settingsResponse.ok ? ((await settingsResponse.json()) as { id: string; value: string }[]) : undefined
            }
            product={product}
          />
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
