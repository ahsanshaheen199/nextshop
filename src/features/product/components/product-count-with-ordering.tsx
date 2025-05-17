import { ProductSorting } from '@/features/product/components/product-sorting';
import { SearchParams } from '@/types';
import { ProductCount } from '@/features/product/components/product-count';
import { getProductsWithPagination } from '@/features/product/api';
import { GridListSwitcher } from '@/features/product/components/grid-list-switcher';
import { FilterButton } from '@/features/product/components/filter-button';

type Props = {
  searchParamsValue: SearchParams;
};

export async function ProductCountWithOrdering({ searchParamsValue }: Props) {
  const { meta } = await getProductsWithPagination({
    page: searchParamsValue?.page ? Number(searchParamsValue['page']) : 1,
    orderBy: searchParamsValue?.orderby ? (searchParamsValue['orderby'] as string) : 'default',
    perPage: searchParamsValue?.perPage ? Number(searchParamsValue['perPage']) : 9,
  });

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <div className="block xl:hidden">
          <FilterButton />
        </div>

        <ProductCount
          total={meta.total}
          productsPerPage={9}
          currentPage={searchParamsValue?.page ? Number(searchParamsValue['page']) : 1}
        />
      </div>
      <div className="flex items-center gap-x-4">
        <ProductSorting sortBy={searchParamsValue?.orderby ? (searchParamsValue['orderby'] as string) : 'default'} />
        <GridListSwitcher />
      </div>
    </div>
  );
}
