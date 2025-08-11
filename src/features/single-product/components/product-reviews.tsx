'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import appAxios from '@/lib/app-axios';
import { ProductReview } from '@/types';
import { Rating } from '@/features/product/components/rating';
import { Fragment, useState } from 'react';
import { Button } from '@/components/form/button';
import { CreateReviewModal } from './create-review-modal';
import { ProductResponseItem } from '@/types/product-response';

type Props = {
  product: ProductResponseItem;
  session: string | null;
};

export function ProductReviews({ product, session }: Props) {
  const [open, setOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['product-reviews', product.id],
    queryFn: ({ pageParam = 1 }) =>
      appAxios
        .get<ProductReview[]>(`/wc/store/v1/products/reviews?product_id=${product.id}&page=${pageParam}&per_page=1`)
        .then((res) => {
          return {
            data: res.data,
            next_page: pageParam + 1 > Number(res.headers['x-wp-totalpages']) ? null : pageParam + 1,
            previous_page: pageParam > 1 ? pageParam - 1 : null,
          };
        }),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.previous_page,
    initialPageParam: 1,
  });

  return (
    <Fragment>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-satoshi-bold text-2xl font-bold text-black">All Reviews</h2>
        <div className="flex items-center gap-2">
          {session && <CreateReviewModal open={open} setOpen={setOpen} session={session} productId={product.id} />}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {data.pages.map((page) => {
          return page.data.map((review: ProductReview) => {
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
          });
        })}
      </div>
      {hasNextPage && (
        <div className="mt-9 flex justify-center">
          <Button
            className="bg-white text-black ring-1 ring-black/10 hover:bg-black hover:text-white"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </Fragment>
  );
}
