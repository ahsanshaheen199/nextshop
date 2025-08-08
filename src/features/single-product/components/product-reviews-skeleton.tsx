export function ProductReviewsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {Array.from({ length: count }, (_, i) => {
        return (
          <div key={i} className="rounded-[20px] border border-black/10 px-8 py-7">
            {/* Rating skeleton */}
            <div className="mb-2 lg:mb-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <div
                    key={starIndex}
                    className="h-[19px] w-[19px] animate-pulse rounded-sm bg-gray-200 lg:h-[23px] lg:w-[23px]"
                  ></div>
                ))}
              </div>
            </div>

            {/* Reviewer name skeleton */}
            <div className="mb-2 h-6 w-32 animate-pulse rounded bg-gray-200 lg:mb-3 lg:h-7"></div>

            {/* Review content skeleton */}
            <div className="mb-2 lg:mb-3">
              <div className="mb-2.5 h-4 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="mb-2.5 h-4 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="mb-2.5 h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
            </div>

            {/* Date skeleton */}
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
          </div>
        );
      })}
    </div>
  );
}
