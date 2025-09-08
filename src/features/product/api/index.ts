import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { ProductResponseItem } from '@/types/product-response';

export async function getProductsWithPagination(params: string, category?: string | number) {
  let queryString = `per_page=9&${params}`;

  if (category) {
    queryString += `&category=${category}`;
  }

  const response = await apiFetchWithoutAuth(`/wc/store/v1/products?${queryString}`);

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
