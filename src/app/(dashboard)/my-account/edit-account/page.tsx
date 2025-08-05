import { CustomerAccount } from '@/features/my-account/components/customer-account';
import { CustomerAccountSkeleton } from '@/features/my-account/components/customer-account-skeleton';
import { Suspense } from 'react';

export default async function EditAccountPage() {
  return (
    <Suspense fallback={<CustomerAccountSkeleton />}>
      <CustomerAccount />
    </Suspense>
  );
}
