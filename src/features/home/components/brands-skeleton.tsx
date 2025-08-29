export function BrandsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="mb-12 bg-white py-11 lg:mb-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-x-5">
          {Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="relative h-6 w-28 lg:h-9 lg:w-48">
              <div className="h-full w-full animate-pulse rounded-md bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
