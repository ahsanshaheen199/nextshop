import { Metadata } from 'next';
import { Suspense } from 'react';
import { OrdersSkeleton } from '@/features/my-account/components/orders-skeleton';
import { Orders } from '@/features/my-account/components/orders';
import { SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Orders',
};

export default function OrdersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <Suspense fallback={<OrdersSkeleton />}>
      <Orders searchParamsValue={searchParams} />
    </Suspense>
  );
}
