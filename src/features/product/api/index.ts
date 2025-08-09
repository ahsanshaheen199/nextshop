import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { ProductResponseItem } from '@/types/product-response';

export async function getProductsWithPagination({
  page = 1,
  orderBy,
  perPage,
}: {
  page: number;
  orderBy: string;
  order?: 'desc' | 'asc';
  perPage: number;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());
  searchParams.set('per_page', perPage.toString());

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

  if (!response.ok) {
    return {
      products: [],
      meta: {
        total: 0,
        totalPages: 1,
      },
    };
  }
  const result = (await response.json()) as ProductResponseItem[];

  return {
    products: result,
    meta: {
      total: response.headers.has('x-wp-total') ? Number(response.headers.get('x-wp-total')) : 0,
      totalPages: response.headers.has('x-wp-totalpages') ? Number(response.headers.get('x-wp-totalpages')) : 1,
    },
  };
}

export async function getBestSellingProducts() {
  const response = await apiFetchWithoutAuth(`/wc/store/v1/products?orderby=popularity&order=desc`);

  if (!response.ok) {
    return [] as ProductResponseItem[];
  }

  const products = (await response.json()) as ProductResponseItem[];
  return products;
}

export async function getNewArrivalsProducts() {
  const response = await apiFetchWithoutAuth(`/wc/store/v1/products?orderby=date&order=desc`);

  if (!response.ok) {
    return [] as ProductResponseItem[];
  }

  const products = (await response.json()) as ProductResponseItem[];
  return products;
}

export async function getGroupedProducts(productIds: number[]) {
  const response = await apiFetchWithoutAuth(`/wc/store/v1/products?include=${productIds.join(',')}`);

  if (!response.ok) {
    return [] as ProductResponseItem[];
  }

  const products = (await response.json()) as ProductResponseItem[];
  return products;
}
