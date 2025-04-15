import { Fragment } from 'react';
import { Pagination } from '@/features/product/components/pagination';
import { SearchParams } from '@/types';
import { getProductsWithPagination } from '@/features/product/api';
import { ProductList } from '@/features/product/components/product-list';

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
      <ProductList products={products} />

      <div className="border-t border-black/10 pt-6">
        <Pagination totalPages={meta.totalPages} searchParamsValue={searchParamsValue} />
      </div>
    </Fragment>
  );
}
