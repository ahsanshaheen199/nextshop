'use server';

import { apiFetch } from '@/lib/app-fetch';

export async function createProductReview(
  prevState: unknown,
  payload: { rating: number; review: string; productId: number; reviewer: string; reviewerEmail: string }
) {
  const res = await apiFetch(`/wc/v3/products/reviews`, {
    method: 'POST',
    body: JSON.stringify({
      product_id: payload.productId,
      review: payload.review,
      reviewer: payload.reviewer,
      reviewer_email: payload.reviewerEmail,
      rating: payload.rating,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    return { success: 'Review submitted' };
  }

  const result = await res.json();

  return { error: result.message };
}
