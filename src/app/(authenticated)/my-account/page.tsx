import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Account',
};

export default function MyAccountPage() {
  return (
    <div>
      <p className="mb-4 text-base text-black/60">
        Hello, <span className="font-bold">John Doe</span>
      </p>
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
