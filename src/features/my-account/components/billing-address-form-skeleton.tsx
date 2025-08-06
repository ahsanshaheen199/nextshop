export function BillingAddressFormSkeleton() {
  return (
    <div className="rounded-2xl border border-black/10 p-6">
      <div className="animate-pulse">
        {/* First Name and Last Name */}
        <div className="mb-5 grid grid-cols-12 gap-x-5">
          <div className="col-span-6">
            <div className="mb-2.5 h-5 w-20 rounded-full bg-gray-200"></div>
            <div className="h-12 w-full rounded-full bg-gray-200"></div>
          </div>
          <div className="col-span-6">
            <div className="mb-2.5 h-5 w-20 rounded-full bg-gray-200"></div>
            <div className="h-12 w-full rounded-full bg-gray-200"></div>
          </div>
        </div>

        {/* Company */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Country/Region */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-28 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Street Address */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-28 rounded-full bg-gray-200"></div>
          <div className="mb-3 h-12 w-full rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* City */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-16 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* State */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-12 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Postcode */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-24 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-24 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Phone */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-16 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Submit Button */}
        <div>
          <div className="h-12 w-32 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
