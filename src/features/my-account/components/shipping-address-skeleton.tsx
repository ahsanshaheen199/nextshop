export function ShippingAddressSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Edit/Add Link */}
      <div className="mb-3 flex justify-end">
        <div className="h-5 w-36 rounded-full bg-gray-200"></div>
      </div>

      {/* Address Information */}
      <div className="space-y-2">
        {/* Name */}
        <div className="h-5 w-40 rounded-full bg-gray-200"></div>

        {/* Address Line */}
        <div className="h-5 w-48 rounded-full bg-gray-200"></div>

        {/* City */}
        <div className="h-5 w-32 rounded-full bg-gray-200"></div>

        {/* State */}
        <div className="h-5 w-24 rounded-full bg-gray-200"></div>

        {/* Postcode */}
        <div className="h-5 w-20 rounded-full bg-gray-200"></div>

        {/* Country */}
        <div className="h-5 w-28 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}
