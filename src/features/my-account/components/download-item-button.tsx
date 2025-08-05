'use client';

import { Download } from '@/types/download';
import { useRouter } from 'next/navigation';

type Props = {
  download: Download;
};

export function DownloadItemButton({ download }: Props) {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer text-black underline"
      onClick={() => {
        const link = document.createElement('a');
        link.href = download.download_url;
        link.click();
        link.remove();
        router.refresh();
      }}
    >
      {download.file.name}
    </button>
  );
}
