import { Fragment } from 'react';
import { Pagination } from '@/features/product/components/pagination';
import { SearchParams } from '@/types';
import { getProductsWithPagination } from '@/features/product/api';
import { ProductList } from '@/features/product/components/product-list';
import qs from 'qs';

type Props = {
  searchParamsValue: SearchParams;
};

export async function ProductListWithPagination({ searchParamsValue }: Props) {
  let params = '';
  if (Object.keys(searchParamsValue).length > 0) {
    const newSearchParams = new URLSearchParams(searchParamsValue as Record<string, string>);
    params = newSearchParams.toString();
  }

  const { products, meta } = await getProductsWithPagination(params);

  return (
    <Fragment>
      <ProductList products={products} />

      <div className="border-t border-black/10 pt-6">
        <Pagination totalPages={meta.totalPages} />
      </div>
    </Fragment>
  );
}
