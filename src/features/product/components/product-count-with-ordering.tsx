import { ProductSorting } from '@/features/product/components/product-sorting';
import { SearchParams } from '@/types';
import { ProductCount } from '@/features/product/components/product-count';
import { getProductsWithPagination } from '@/features/product/api';

type Props = {
  searchParamsValue: SearchParams;
};

export async function ProductCountWithOrdering({ searchParamsValue }: Props) {
  const { meta } = await getProductsWithPagination({
    page: searchParamsValue?.page ? Number(searchParamsValue['page']) : 1,
    orderBy: searchParamsValue?.orderby ? (searchParamsValue['orderby'] as string) : 'default',
  });

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <ProductCount
          total={meta.total}
          productsPerPage={9}
          currentPage={searchParamsValue?.page ? Number(searchParamsValue['page']) : 1}
        />
      </div>
      <div>
        <ProductSorting sortBy={searchParamsValue?.orderby ? (searchParamsValue['orderby'] as string) : 'default'} />
      </div>
    </div>
  );
}
