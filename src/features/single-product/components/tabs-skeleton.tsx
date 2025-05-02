export function TabsSkeleton() {
  return (
    <div className="mb-[50px] lg:mb-20">
      <div className="mb-6 grid grid-cols-3 border-b border-black/10">
        <div className="col-span-1 mx-auto mb-5 h-8 w-2/3 animate-pulse rounded bg-gray-200"></div>
        <div className="col-span-1 mx-auto mb-5 h-8 w-2/3 animate-pulse rounded bg-gray-200"></div>
        <div className="col-span-1 mx-auto mb-5 h-8 w-2/3 animate-pulse rounded bg-gray-200"></div>
      </div>
      <div className="mb-2.5 h-4 w-full animate-pulse rounded bg-gray-200"></div>
      <div className="mb-2.5 h-4 w-full animate-pulse rounded bg-gray-200"></div>
      <div className="mb-2.5 h-4 w-full animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
    </div>
  );
}
