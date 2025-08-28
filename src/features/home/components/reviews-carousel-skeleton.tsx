export function ReviewsCarouselSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div>
      <div className="container mx-auto">
        <div className="relative mb-6 lg:mb-10">
          <div className="h-[36px] w-[260px] animate-pulse rounded-[20px] bg-gray-200 lg:h-[56px] lg:w-[420px]" />
          <div className="absolute right-0 bottom-0 z-10 flex gap-x-2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="mb-12 lg:mb-20">
        <div className="overflow-hidden">
          <div className="touch-pin-zoom -ml-5 flex touch-pan-y">
            {Array.from({ length: count }).map((_, idx) => (
              <div
                key={idx}
                className="min-w-0 shrink-0 grow-0 basis-1/2 translate-x-0 translate-y-0 translate-z-0 transform pl-5 select-none lg:basis-[20%]"
              >
                <div className="rounded-[20px] border border-black/10 px-8 py-7">
                  <div className="mb-2 lg:mb-3">
                    <div className="h-[23px] w-[140px] animate-pulse rounded-[20px] bg-gray-200" />
                  </div>
                  <div className="mb-2 h-[22px] w-[180px] animate-pulse rounded-[20px] bg-gray-200 lg:mb-3" />
                  <div className="mb-2 h-[22px] w-[260px] animate-pulse rounded-[20px] bg-gray-200 lg:mb-3" />
                  <div className="h-[22px] w-[200px] animate-pulse rounded-[20px] bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
