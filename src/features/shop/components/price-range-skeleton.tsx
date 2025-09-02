export function PriceRangeSkeleton() {
  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <div className="h-7 w-16 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
      </div>

      <div className="pt-3">
        <div className="mb-3 h-2 w-full animate-pulse rounded-2.5xl bg-gray-200"></div>

        <div className="flex items-center justify-between">
          <div className="h-4 w-8 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
