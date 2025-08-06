export function BillingShippingAddressSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
        {/* Billing Address */}
        <div className="mb-8 lg:col-span-6 lg:mb-0">
          <div className="mb-4 h-6 w-32 rounded-full bg-gray-200"></div>
          <div className="space-y-2 rounded-2xl border border-black/10 p-4">
            <div className="h-5 w-32 rounded-full bg-gray-200"></div>
            <div className="h-5 w-40 rounded-full bg-gray-200"></div>
            <div className="h-5 w-24 rounded-full bg-gray-200"></div>
            <div className="h-5 w-28 rounded-full bg-gray-200"></div>
            <div className="h-5 w-20 rounded-full bg-gray-200"></div>
            <div className="h-5 w-36 rounded-full bg-gray-200"></div>
            <div className="h-5 w-48 rounded-full bg-gray-200"></div>
            <div className="h-5 w-32 rounded-full bg-gray-200"></div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="lg:col-span-6">
          <div className="mb-4 h-6 w-36 rounded-full bg-gray-200"></div>
          <div className="space-y-2 rounded-2xl border border-black/10 p-4">
            <div className="h-5 w-32 rounded-full bg-gray-200"></div>
            <div className="h-5 w-40 rounded-full bg-gray-200"></div>
            <div className="h-5 w-24 rounded-full bg-gray-200"></div>
            <div className="h-5 w-28 rounded-full bg-gray-200"></div>
            <div className="h-5 w-20 rounded-full bg-gray-200"></div>
            <div className="h-5 w-36 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
