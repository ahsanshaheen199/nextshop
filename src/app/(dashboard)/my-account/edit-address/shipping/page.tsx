import { ShippingAddress } from '@/features/my-account/components/shipping-address';
import { ShippingAddressFormSkeleton } from '@/features/my-account/components/shipping-address-form-skeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shipping Address',
};

export default async function ShippingAddressPage() {
  return (
    <div>
      <h2 className="mb-5 font-satoshi-bold text-2xl text-black">Shipping Address</h2>
      <Suspense fallback={<ShippingAddressFormSkeleton />}>
        <ShippingAddress />
      </Suspense>
    </div>
  );
}
