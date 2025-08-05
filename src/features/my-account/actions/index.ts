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

export async function updateCustomer(prevState: unknown, formData: FormData) {
  const customerId = formData.get('customerId');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.has('password') ? formData.get('password')?.toString() : '';
  const confirmPassword = formData.has('confirmPassword') ? formData.get('confirmPassword')?.toString() : '';

  if (password !== confirmPassword && confirmPassword !== '' && password !== '') {
    return { error: 'Passwords do not match', password, confirmPassword };
  }

  const response = await apiFetch(`/wc/v3/customers/${customerId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...(firstName !== '' && { first_name: firstName }),
      ...(lastName !== '' && { last_name: lastName }),
      ...(username !== '' && { username }),
      ...(email !== '' && { email }),
      ...(password !== '' && { password }),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return { error: 'Failed to update customer' };
  }

  revalidateTag('customer');

  return { success: 'Customer updated' };
}
