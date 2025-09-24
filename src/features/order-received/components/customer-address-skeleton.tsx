export function CustomerAddressSkeleton() {
  return (
    <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-5">
      {/* Billing Address */}
      <div className="mb-5 rounded-2xl border border-black/10 p-6 lg:col-span-6 lg:mb-0">
        <div className="mb-4 h-7 w-36 animate-pulse rounded bg-gray-200"></div>
        <div className="space-y-2">
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-56 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-44 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-36 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="rounded-2xl border border-black/10 p-6 lg:col-span-6">
        <div className="mb-4 h-7 w-40 animate-pulse rounded bg-gray-200"></div>
        <div className="space-y-2">
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-56 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-44 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-36 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
