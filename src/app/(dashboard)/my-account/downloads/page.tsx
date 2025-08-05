import { Metadata } from 'next';
import { Suspense } from 'react';
import { Downloads } from '@/features/my-account/components/downloads';
import { DownloadsSkeleton } from '@/features/my-account/components/downloads-skeleton';

export const metadata: Metadata = {
  title: 'Downloads',
};

export default async function DownloadsPage() {
  return (
    <Suspense fallback={<DownloadsSkeleton />}>
      <Downloads />
    </Suspense>
  );
}
