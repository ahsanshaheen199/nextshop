export function DownloadsSkeleton() {
  return (
    <div className="rounded-2xl border border-black/10">
      <div className="overflow-x-auto">
        <table className="relative min-w-full divide-y divide-black/10">
          <thead>
            <tr>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Product
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Downloads Remaining
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Expires
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-3 py-4 text-center text-sm font-medium whitespace-nowrap">
                  <div className="mx-auto h-4 w-24 animate-pulse rounded-full bg-gray-200" />
                </td>
                <td className="px-3 py-4 text-center text-sm whitespace-nowrap">
                  <div className="mx-auto h-4 w-24 animate-pulse rounded-full bg-gray-200" />
                </td>
                <td className="px-3 py-4 text-center text-sm whitespace-nowrap">
                  <div className="mx-auto h-4 w-24 animate-pulse rounded-full bg-gray-200" />
                </td>
                <td className="px-3 py-4 text-center text-sm whitespace-nowrap">
                  <div className="mx-auto h-4 w-24 animate-pulse rounded-full bg-gray-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
