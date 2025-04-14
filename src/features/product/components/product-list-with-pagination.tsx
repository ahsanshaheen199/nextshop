import { Fragment } from 'react';
import { calculateDiscountPercentage } from '@/utlis';
import Link from 'next/link';
import Image from 'next/image';
import { Pagination } from '@/features/product/components/pagination';
import { SearchParams } from '@/types';
import { getProductsWithPagination } from '@/features/product/api';
import { Rating } from '@/features/product/components/rating';

type Props = {
  searchParamsValue: SearchParams;
};

export async function ProductListWithPagination({ searchParamsValue }: Props) {
  const { products, meta } = await getProductsWithPagination({
    page: searchParamsValue?.page ? Number(searchParamsValue['page']) : 1,
    orderBy: searchParamsValue?.orderby ? (searchParamsValue['orderby'] as string) : 'default',
  });

  return (
    <Fragment>
      <div className="grid grid-cols-3 gap-x-5">
        {products.map((product) => {
          return (
            <div key={product.id} className="group/product-item relative mb-5 overflow-hidden">
              {product.images.length > 0 ? (
                <div className="rounded-[20px]">
                  <Link
                    href={`/products/${product.slug}`}
                    className="group/product-item-link relative block overflow-hidden"
                  >
                    <Image
                      width={400}
                      height={400}
                      alt={product.name}
                      src={product.images[0].thumbnail}
                      sizes={product.images[0].sizes}
                      className="rounded-[20px]"
                    />
                    {product.images.length > 1 ? (
                      <Image
                        width={400}
                        height={400}
                        alt={product.name}
                        src={product.images[1].thumbnail}
                        sizes={product.images[1].sizes}
                        className="absolute inset-0 h-full w-full rounded-[20px] object-cover opacity-0 transition-opacity group-hover/product-item-link:opacity-100"
                      />
                    ) : null}
                  </Link>
                </div>
              ) : null}

              <div className="flex flex-col items-center bg-white p-4 transition-transform group-hover/product-item:-translate-y-[2.2rem]">
                <h2 className="mb-2 font-satoshi-bold text-xl leading-none text-black hover:text-black/60">
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h2>
                {!isNaN(Number(product.average_rating)) && Number(product.average_rating) > 0 ? (
                  <div className="mb-2 flex items-center gap-x-3.5">
                    <Rating
                      fullStarClassName={'w-[19px] h-[17px]'}
                      halfStarClassName={'w-[9px] h-[17px]'}
                      averageRating={isNaN(Number(product.average_rating)) ? 0 : Number(product.average_rating)}
                    />
                    <p className="mt-0.5 font-satoshi text-sm text-black">
                      <span>{Number(product.average_rating)}/</span>
                      <span className="text-black/60">5</span>
                    </p>
                  </div>
                ) : null}

                <div className="mb-4 flex items-center gap-2.5">
                  <p
                    className="flex items-center gap-x-2.5 font-satoshi-bold text-lg leading-none [&_del]:order-2 [&_del]:text-black/40 [&_ins]:order-1 [&_ins]:text-black [&_ins]:no-underline"
                    dangerouslySetInnerHTML={{ __html: product.price_html }}
                  ></p>
                  {['external', 'simple'].includes(product.type) &&
                    (product.on_sale ? (
                      <span className="rounded-full bg-[rgba(255,51,51,.10)] px-3 py-1.5 font-satoshi-medium text-xs text-[#FF3333]">
                        -{calculateDiscountPercentage(product.prices)}%
                      </span>
                    ) : null)}
                </div>
                <div className="absolute bottom-[-2.2rem] flex w-full justify-center bg-white opacity-0 transition-opacity group-hover/product-item:opacity-100">
                  <button className="w-auto cursor-pointer rounded-full border border-black bg-black px-7 py-3 font-satoshi-medium text-base text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-black/10 py-20 pt-6">
        <Pagination totalPages={meta.totalPages} searchParamsValue={searchParamsValue} />
      </div>
    </Fragment>
  );
}
