'use client';

import { Product } from '@/features/product/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import appAxios from '@/lib/app-axios';
import { ProductReview } from '@/types';
import { Rating } from '@/features/product/components/rating';

type Props = {
  product: Product;
};

export function ProductReviews({ product }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['product-reviews', product.id],
    queryFn: () =>
      appAxios.get<ProductReview[]>(`/wc/store/v1/products/reviews?product_id=${product.id}`).then((res) => res.data),
  });

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {data.map((review) => {
        return (
          <div key={review.id} className="rounded-[20px] border border-black/10 px-8 py-7">
            <div className="mb-2 lg:mb-3">
              <Rating
                fullStarClassName={'lg:w-[23px] w-[19px] h-[19px] lg:h-[23px]'}
                halfStarClassName={'lg:w-[11px] lg:h-[23px] w-[9px] h-[17px]'}
                averageRating={isNaN(Number(review.rating)) ? 0 : Number(review.rating)}
              />
            </div>
            <h4 className="mb-2 inline-flex font-satoshi-bold text-base leading-[22px] text-black lg:mb-3 lg:text-xl">
              {review.reviewer}
            </h4>
            <div
              className="mb-2 lg:mb-3 [&_p]:font-satoshi [&_p]:text-sm [&_p]:leading-[22px] [&_p]:text-black/60 [&_p]:lg:text-base"
              dangerouslySetInnerHTML={{ __html: review.review }}
            ></div>
            <p className="font-satoshi-medium text-sm leading-[22px] text-black/60 lg:text-base">
              Posted on {review.formatted_date_created}
            </p>
          </div>
        );
      })}
    </div>
  );
}
