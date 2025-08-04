'use client';

import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { Button } from '@/components/form/button';
import { Fragment, useActionState } from 'react';
import { forgotPassword } from '../actions';
import { twMerge } from 'tailwind-merge';

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  if (state?.success) {
    return (
      <Fragment>
        <div className={twMerge('flex w-full justify-between rounded-lg border border-[#1B5728]/10 bg-[#F2FDF5] p-5')}>
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-semibold text-[#306339]">
              A password reset link has been sent to your email address.
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-black/60">
          A password reset email has been sent to the email address on file for your account, but may take several
          minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.
        </p>
      </Fragment>
    );
  }

  return (
    <form action={formAction}>
      {state?.error && (
        <div
          className={twMerge(
            'w-fulljustify-between z-20 mb-5 flex rounded-lg border border-[#571B23]/10 bg-[rgba(255,229,229,1)] p-5'
          )}
        >
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-semibold text-[#9F2225]">Failed to send reset password email</p>
          </div>
        </div>
      )}

      <div className="mb-5">
        <FormLabel htmlFor="user_login" className="mb-2.5 inline-block">
          Username or email <span className="text-base text-red-500">*</span>
        </FormLabel>
        <FormInput id="user_login" className="w-full" type="text" name="user_login" />
        <p className="mt-1.5 text-sm text-black/60">
          Please enter your username or email address. You will receive a link to create a new password via email.
        </p>
      </div>

      <div>
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {isPending ? 'Sending...' : 'Reset Password'}
        </Button>
      </div>
    </form>
  );
}
