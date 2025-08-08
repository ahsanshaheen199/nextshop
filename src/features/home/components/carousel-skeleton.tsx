export function CarouselSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="overflow-hidden">
      <div className="touch-pin-zoom -ml-5 flex touch-pan-y">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-0 shrink-0 grow-0 basis-1/2 translate-x-0 translate-y-0 translate-z-0 transform pl-5 select-none lg:basis-1/4"
          >
            <div className="mb-5">
              <div className="h-[280px] w-full animate-pulse rounded-[20px] bg-gray-200" />
              <div className="p-4">
                <div className="mx-auto mb-2 h-6 w-[160px] animate-pulse rounded-[20px] bg-gray-200" />
                <div className="mx-auto h-5 w-[130px] animate-pulse rounded-[20px] bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
