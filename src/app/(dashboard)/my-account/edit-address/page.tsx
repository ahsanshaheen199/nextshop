import { BillingAddress } from '@/features/my-account/components/billing-address';
import { BillingAddressSkeleton } from '@/features/my-account/components/billing-address-skeleton';
import { ShippingAddress } from '@/features/my-account/components/shipping-address';
import { ShippingAddressSkeleton } from '@/features/my-account/components/shipping-address-skeleton';
import { Suspense } from 'react';

export default function EditAddressPage() {
  return (
    <div>
      <p className="mb-8 text-base text-black/60">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <div className="mb-5 lg:col-span-6 lg:mb-0">
          <h2 className="mb-2 font-satoshi-bold text-2xl text-black">Billing Address</h2>
          <Suspense fallback={<BillingAddressSkeleton />}>
            <BillingAddress />
          </Suspense>
        </div>
        <div className="lg:col-span-6">
          <h2 className="mb-2 font-satoshi-bold text-2xl text-black">Shipping Address</h2>
          <Suspense fallback={<ShippingAddressSkeleton />}>
            <ShippingAddress />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
