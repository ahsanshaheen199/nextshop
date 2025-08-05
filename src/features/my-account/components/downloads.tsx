import { verifySession } from '@/dal/session';
import { jwtDecode } from 'jwt-decode';
import { getDownloads } from '../api';
import { NoDownloadsFound } from './no-downloads-found';
import Link from 'next/link';
import { DownloadItemButton } from './download-item-button';

export async function Downloads() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session) as { data: { user: { id: number } } };

  const downloads = await getDownloads(decodedSession.data.user.id);

  if (downloads.length === 0) {
    return <NoDownloadsFound />;
  }

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
            {downloads.map((download, index) => {
              let formattedDate = 'Never';
              if (download.access_expires !== 'never') {
                const date = new Date(download.access_expires);

                const formatter = new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                });

                formattedDate = formatter.format(date);
              }
              return (
                <tr key={index}>
                  <td className="px-3 py-4 text-center text-sm font-medium whitespace-nowrap">
                    <Link href={`/products/${download.product_id}`} className="text-black underline">
                      {download.product_name}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-center text-sm whitespace-nowrap text-black/60">
                    {download.downloads_remaining}
                  </td>
                  <td className="px-3 py-4 text-center text-sm whitespace-nowrap text-black/60">{formattedDate}</td>
                  <td className="px-3 py-4 text-center text-sm whitespace-nowrap text-black/60">
                    <DownloadItemButton download={download} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
