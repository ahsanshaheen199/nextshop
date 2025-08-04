import { Breadcrumb } from '@/components/breadcrumb';
import { RegisterForm } from '@/features/register/components/register-form';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <Breadcrumb
            links={[
              { title: 'Home', href: '/' },

              { title: 'Register', href: '#' },
            ]}
          />
        </div>
        <div className="grid grid-cols-12 pb-12 lg:pb-20">
          <div className="col-start-4 col-end-10">
            <div className="mb-6">
              <h1 className="text-center text-2xl">Create your account</h1>
            </div>

            <div className="rounded-2.5xl border border-black/10 p-6">
              <RegisterForm />
              <p className="mt-5 flex gap-x-2 text-center text-sm text-black/60">
                Already member?
                <Link href="/login" className="font-semibold text-black hover:text-gray-700 hover:underline">
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
