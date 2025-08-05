import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { User } from '@/features/my-account/components/user';

export const metadata: Metadata = {
  title: 'My Account',
};

export default async function MyAccountPage() {
  return (
    <div>
      <Suspense fallback={<div className="mb-4 h-4 w-32 animate-pulse rounded-full bg-gray-200" />}>
        <User />
      </Suspense>

      <p className="text-base text-black/60">
        From your account dashboard you can view your{' '}
        <Link className="text-black hover:underline" href="/my-account/orders">
          recent orders
        </Link>
        , manage your{' '}
        <Link className="text-black hover:underline" href="/my-account/edit-address">
          shipping and billing addresses
        </Link>
        , and{' '}
        <Link className="text-black hover:underline" href="/my-account/edit-account">
          edit your password
        </Link>{' '}
        and{' '}
        <Link className="text-black hover:underline" href="/my-account/edit-account">
          account details
        </Link>
        .
      </p>
    </div>
  );
}
