export function GroupedAddToCartSkeleton() {
  return (
    <div className="my-6 rounded-2.5xl border border-black/10 p-3.5 lg:p-4">
      <ul>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="relative w-full border-b border-black/10 py-4 first:pt-0 last:border-b-0 last:pb-0">
            <div className="flex gap-x-3.5 lg:gap-x-4">
              <div className="relative h-20 w-20 flex-none animate-pulse rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="flex flex-col gap-y-3">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200 lg:h-12 lg:w-32" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 h-[52px] w-full animate-pulse rounded-[62px] bg-gray-200 lg:h-[56px]" />
    </div>
  );
}
