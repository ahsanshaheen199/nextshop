'use server';

import { apiFetch } from '@/lib/app-fetch';
import { revalidateTag } from 'next/cache';

export async function cancelOrder(prevState: unknown, formData: FormData) {
  const orderId = formData.get('orderId');

  const response = await apiFetch(`/wc/v3/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify({
      status: 'cancelled',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return { error: 'Failed to cancel order' };
  }

  revalidateTag('orders');

  return { success: 'Order cancelled' };
}
