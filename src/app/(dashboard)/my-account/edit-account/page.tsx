import { CustomerAccount } from '@/features/my-account/components/customer-account';
import { CustomerAccountSkeleton } from '@/features/my-account/components/customer-account-skeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Account Details',
};

export default async function EditAccountPage() {
  return (
    <Suspense fallback={<CustomerAccountSkeleton />}>
      <CustomerAccount />
    </Suspense>
  );
}
