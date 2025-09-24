import { Breadcrumb } from '@/components/breadcrumb';
import { Params } from '@/types';
import { Suspense } from 'react';
import { CustomerAddress } from '@/features/order-received/components/customer-address';
import { OrderSummary } from '@/features/order-received/components/order-summary';
import { OrderDetails } from '@/features/order-received/components/order-details';
import { OrderSummarySkeleton } from '@/features/order-received/components/order-summary-skeleton';
import { OrderDetailsSkeleton } from '@/features/order-received/components/order-details-skeleton';
import { CustomerAddressSkeleton } from '@/features/order-received/components/customer-address-skeleton';

export default async function OrderReceivedPage({ params }: { params: Params<{ id: string }> }) {
  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },
              { title: 'Order Received', href: '#' },
            ]}
          />
        </div>
        <div className="pb-12 lg:pb-20">
          <p className="mb-8 text-base text-black/60">Thank you. Your order has been received.</p>
          <Suspense fallback={<OrderSummarySkeleton />}>
            <OrderSummary params={params} />
          </Suspense>
          <div>
            <h2 className="mb-4 font-satoshi-bold text-2xl text-black">Order Details</h2>
            <Suspense fallback={<OrderDetailsSkeleton />}>
              <OrderDetails params={params} />
            </Suspense>
          </div>
          <Suspense fallback={<CustomerAddressSkeleton />}>
            <CustomerAddress params={params} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
