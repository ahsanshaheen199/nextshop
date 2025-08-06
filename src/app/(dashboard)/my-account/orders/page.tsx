import { Metadata } from 'next';
import { Suspense } from 'react';
import { OrdersSkeleton } from '@/features/my-account/components/orders-skeleton';
import { Orders } from '@/features/my-account/components/orders';

export const metadata: Metadata = {
  title: 'Orders',
};

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersSkeleton />}>
      <Orders />
    </Suspense>
  );
}
