import Link from 'next/link';
import { DownloadIcon } from '@/components/icons/download';

export function NoDownloadsFound() {
  return (
    <div className="flex flex-col rounded-2.5xl border border-black/10 py-6">
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F0F0]">
          <DownloadIcon className="h-8 w-8 text-black" />
        </div>
        <p className="mb-2 text-xl font-bold">No Downloads Found</p>
        <p className="mb-4 text-base text-black/60">You don't have any downloadable products yet.</p>
        <Link
          href="/shop"
          className="lg:text-base' inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-7 py-3 font-satoshi-medium text-sm text-white hover:bg-black/80 disabled:opacity-50 lg:px-10"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
