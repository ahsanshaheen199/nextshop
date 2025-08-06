import { BillingAddress } from '@/features/my-account/components/billing-address';
import { BillingAddressFormSkeleton } from '@/features/my-account/components/billing-address-form-skeleton';
import { Suspense } from 'react';

export default function BillingAddressPage() {
  return (
    <div>
      <h2 className="mb-5 font-satoshi-bold text-2xl text-black">Billing Address</h2>
      <Suspense fallback={<BillingAddressFormSkeleton />}>
        <BillingAddress />
      </Suspense>
    </div>
  );
}
