import { Breadcrumb } from '@/components/breadcrumb';
import { ChevronRight } from '@/components/icons/chevron-right';
import { ForgotPasswordForm } from '@/features/forgot-password/components/forgot-password-form';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },

              { title: 'Forgot Password', href: '#' },
            ]}
          />
        </div>
        <div className="pb-12 lg:grid lg:grid-cols-12 lg:pb-20">
          <div className="lg:col-start-4 lg:col-end-10">
            <div className="mb-6">
              <h1 className="text-center text-2xl">Lost Password</h1>
            </div>

            <div className="rounded-2.5xl border border-black/10 p-6">
              <ForgotPasswordForm />
              <p className="mt-5 flex items-center gap-x-0.5 text-center text-sm text-black">
                <ChevronRight className="h-4 w-4 rotate-180" />
                <Link href="/login" className="font-semibold hover:text-gray-700 hover:underline">
                  Return to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
