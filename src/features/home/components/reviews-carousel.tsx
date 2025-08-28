import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { ProductReview } from '@/types';
import { ReviewsCarouselClient } from '@/features/home/components/reviews-carousel-client';

export async function ReviewsCarousel() {
  const response = await apiFetchWithoutAuth('/wc/store/v1/products/reviews?per_page=12');
  if (!response.ok) {
    return null;
  }
  const reviews = (await response.json()) as ProductReview[];
  if (!reviews || reviews.length === 0) return null;

  return <ReviewsCarouselClient reviews={reviews} />;
}
