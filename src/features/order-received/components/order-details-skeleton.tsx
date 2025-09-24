export function OrderDetailsSkeleton() {
  return (
    <div className="divide-y divide-black/10">
      {/* Header */}
      <div className="flex justify-between py-3">
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Product items */}
      {Array.from({ length: 3 }, (_, i) => (
        <div className="flex justify-between py-3" key={i}>
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>
      ))}

      {/* Subtotal */}
      <div className="flex justify-between py-3">
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Shipping Fee */}
      <div className="flex justify-between py-3">
        <div className="h-6 w-28 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Tax */}
      <div className="flex justify-between py-3">
        <div className="h-6 w-12 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Payment Method */}
      <div className="flex justify-between py-3">
        <div className="h-6 w-36 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Total */}
      <div className="flex justify-between py-3">
        <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
