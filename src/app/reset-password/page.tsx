import { Breadcrumb } from '@/components/breadcrumb';
import { ResetPasswordForm } from '@/features/reset-password/components/reset-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
};

export default function ResetPasswordPage() {
  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },
              { title: 'Reset Password', href: '#' },
            ]}
          />
        </div>
        <div className="pb-12 lg:grid lg:grid-cols-12 lg:pb-20">
          <div className="lg:col-start-4 lg:col-end-10">
            <div className="mb-6">
              <h1 className="text-center text-2xl">Reset Your Password</h1>
            </div>

            <div className="rounded-2.5xl border border-black/10 p-6">
              <ResetPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
