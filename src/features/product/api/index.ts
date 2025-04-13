import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { Product } from '@/features/product/types';

export async function getProductsWithPagination({
  page = 1,
  orderBy,
}: {
  page: number;
  orderBy: string;
  order?: 'desc' | 'asc';
}) {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (orderBy === 'default') {
    searchParams.delete('orderby', orderBy);
  }

  if (orderBy !== 'default') {
    searchParams.set('orderby', orderBy);
  }

  if (orderBy === 'price') {
    searchParams.set('order', 'asc');
  }

  if (orderBy === 'price-desc') {
    searchParams.delete('orderby', 'price');
    searchParams.set('orderby', 'price');
    searchParams.set('order', 'desc');
  }

  const response = await apiFetchWithoutAuth(`/wc/store/v1/products?${searchParams.toString()}`);

  console.log(`/wc/store/v1/products?${searchParams.toString()}`);

  if (!response.ok) {
    return {
      products: [],
      meta: {
        total: 0,
        totalPages: 1,
      },
    };
  }
  const result = (await response.json()) as Product[];

  return {
    products: result,
    meta: {
      total: response.headers.has('x-wp-total') ? Number(response.headers.get('x-wp-total')) : 0,
      totalPages: response.headers.has('x-wp-totalpages') ? Number(response.headers.get('x-wp-totalpages')) : 1,
    },
  };
}
