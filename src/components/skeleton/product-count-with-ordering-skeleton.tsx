export function ProductCountWithOrderingSkeleton() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
      <div className="flex justify-end gap-x-2">
        <div className="h-6 w-[150px] animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-10 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-10 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
