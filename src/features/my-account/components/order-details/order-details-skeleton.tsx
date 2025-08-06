export function OrderDetailsSkeleton() {
  return (
    <div className="mb-8">
      <div className="animate-pulse">
        <div className="mb-4 h-8 w-32 rounded-full bg-gray-200"></div>

        <div className="rounded-2xl border border-black/10">
          <div className="overflow-x-auto">
            <table className="relative min-w-full divide-y divide-black/10">
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-3.5 text-center">
                    <div className="mx-auto h-5 w-16 rounded-full bg-gray-200"></div>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center">
                    <div className="mx-auto h-5 w-12 rounded-full bg-gray-200"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {/* Product rows skeleton */}
                {Array.from({ length: 3 }, (_, i) => (
                  <tr key={i}>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-center gap-x-1">
                        <div className="h-5 w-24 rounded-full bg-gray-200"></div>
                        <div className="h-4 w-2 rounded-full bg-gray-200"></div>
                        <div className="h-5 w-6 rounded-full bg-gray-200"></div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="mx-auto h-5 w-16 rounded-full bg-gray-200"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="divide-y divide-black/10">
                {/* Subtotal row */}
                <tr>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-16 rounded-full bg-gray-200"></div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-20 rounded-full bg-gray-200"></div>
                  </td>
                </tr>
                {/* Shipping row */}
                <tr>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-16 rounded-full bg-gray-200"></div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center gap-x-2">
                      <div className="h-5 w-16 rounded-full bg-gray-200"></div>
                      <div className="h-4 w-20 rounded-full bg-gray-200"></div>
                    </div>
                  </td>
                </tr>
                {/* Tax row */}
                <tr>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-8 rounded-full bg-gray-200"></div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-16 rounded-full bg-gray-200"></div>
                  </td>
                </tr>
                {/* Total row */}
                <tr>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-12 rounded-full bg-gray-200"></div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-20 rounded-full bg-gray-200"></div>
                  </td>
                </tr>
                {/* Payment Method row */}
                <tr>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-28 rounded-full bg-gray-200"></div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-24 rounded-full bg-gray-200"></div>
                  </td>
                </tr>
                {/* Actions row */}
                <tr>
                  <td className="px-3 py-4 text-center">
                    <div className="mx-auto h-5 w-16 rounded-full bg-gray-200"></div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <div className="flex items-center justify-center gap-x-2">
                      <div className="h-8 w-16 rounded-full bg-gray-200"></div>
                      <div className="h-8 w-16 rounded-full bg-gray-200"></div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
