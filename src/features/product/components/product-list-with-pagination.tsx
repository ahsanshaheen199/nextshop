import { Fragment } from 'react';
import { formatPrice } from '@/utlis';
import Link from 'next/link';
import { Pagination } from '@/features/product/components/pagination';
import { SearchParams } from '@/types';
import { getProductsWithPagination } from '@/features/product/api';

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
            <div key={product.id} className="mb-9">
              <h2 className="mb-2 font-satoshi-bold text-xl leading-none text-black">
                <Link href={`/products/${product.slug}`}>{product.name}</Link>
              </h2>
              {['external', 'simple'].includes(product.type) && (
                <p className="flex items-center gap-x-2.5 font-satoshi-bold text-lg leading-none text-black">
                  {product.on_sale ? (
                    <>
                      <span>{formatPrice(product.prices.sale_price as string, product.prices)}</span>
                      <span className="text-black/40">
                        {formatPrice(product.prices.regular_price as string, product.prices)}
                      </span>
                    </>
                  ) : (
                    <span>{formatPrice(product.prices.price, product.prices)}</span>
                  )}
                </p>
              )}
              {['variable', 'grouped'].includes(product.type) && (
                <p className="font-satoshi-bold text-lg leading-none text-black">
                  <span>{formatPrice(product.prices.price_range?.min_amount as string, product.prices)}</span>
                  <span> - </span>
                  <span>{formatPrice(product.prices.price_range?.max_amount as string, product.prices)}</span>
                </p>
              )}
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
