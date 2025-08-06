import { Params } from '@/types';
import { OrderDetails } from '@/features/my-account/components/order-details';
import { Fragment, Suspense } from 'react';
import { OrderInfo } from '@/features/my-account/components/order-details/order-info';
import { BillingShippingAddress } from '@/features/my-account/components/order-details/billing-shipping-address';
import { OrderInfoSkeleton } from '@/features/my-account/components/order-details/order-info-skeleton';
import { OrderDetailsSkeleton } from '@/features/my-account/components/order-details/order-details-skeleton';
import { BillingShippingAddressSkeleton } from '@/features/my-account/components/order-details/billing-shipping-address-skeleton';

export default function OrderDetailsPage({ params }: { params: Params<{ orderId: string }> }) {
  return (
    <Fragment>
      <Suspense fallback={<OrderInfoSkeleton />}>
        <OrderInfo params={params} />
      </Suspense>
      <Suspense fallback={<OrderDetailsSkeleton />}>
        <OrderDetails params={params} />
      </Suspense>
      <Suspense fallback={<BillingShippingAddressSkeleton />}>
        <BillingShippingAddress params={params} />
      </Suspense>
    </Fragment>
  );
}
