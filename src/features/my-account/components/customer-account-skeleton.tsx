export function CustomerAccountSkeleton() {
  return (
    <div className="rounded-2xl border border-black/10 p-6">
      <div className="animate-pulse">
        {/* First Name and Last Name Row */}
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

        {/* Username Field */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-16 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-12 rounded-full bg-gray-200"></div>
          <div className="h-12 w-full rounded-full bg-gray-200"></div>
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200"></div>
          <div className="relative">
            <div className="h-12 w-full rounded-full bg-gray-200"></div>
            <div className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-200"></div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-5">
          <div className="mb-2.5 h-5 w-40 rounded-full bg-gray-200"></div>
          <div className="relative">
            <div className="h-12 w-full rounded-full bg-gray-200"></div>
            <div className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-200"></div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <div className="h-12 w-32 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
