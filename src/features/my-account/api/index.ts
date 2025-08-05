import { apiFetch } from '@/lib/app-fetch';
import { Download } from '@/types/download';
import { Order, OrdersResponse } from '@/types/order';

export async function getDownloads(id: number) {
  const response = await apiFetch(`/wc/v3/customers/${id}/downloads`);
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as Download[];
  return data;
}

export async function getOrders(id: number): Promise<OrdersResponse | { orders: []; total: null; totalPages: null }> {
  const response = await apiFetch(`/wc/v3/orders?customer=${id}`, {
    next: {
      tags: ['orders'],
    },
  });
  if (!response.ok) {
    return { orders: [], total: null, totalPages: null };
  }
  const data = (await response.json()) as Order[];
  const totalPages = response.headers.get('X-WP-TotalPages');
  const total = response.headers.get('X-WP-Total');
  return {
    orders: data,
    total: total ? parseInt(total) : 0,
    totalPages: totalPages ? parseInt(totalPages) : 0,
  };
}
