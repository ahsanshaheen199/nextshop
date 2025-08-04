'use client';

import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { Button } from '@/components/form/button';
import { Fragment, useActionState, useEffect, useState } from 'react';
import { resetPassword } from '../actions';
import { twMerge } from 'tailwind-merge';
import { useSearchParams } from 'next/navigation';
import { EyeIcon } from '@/components/icons/eye';
import { EyeOffIcon } from '@/components/icons/eye-off';

export function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState(resetPassword, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('key');
  const login = searchParams.get('login');

  // Show error if no token is provided
  if (!token || !login) {
    return (
      <div
        className={twMerge(
          'flex w-full justify-between rounded-lg border border-[#571B23]/10 bg-[rgba(255,229,229,1)] p-5'
        )}
      >
        <div className="flex flex-1 flex-col">
          <p className="text-sm font-semibold text-[#9F2225]">
            Invalid or missing reset token or login. Please request a new password reset link.
          </p>
        </div>
      </div>
    );
  }

  if (state?.success) {
    return (
      <Fragment>
        <div className={twMerge('flex w-full justify-between rounded-lg border border-[#1B5728]/10 bg-[#F2FDF5] p-5')}>
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-semibold text-[#306339]">Your password has been successfully reset!</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-black/60">You can now use your new password to log in to your account.</p>
      </Fragment>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="key" value={token} />
      <input type="hidden" name="login" value={login} />

      {state?.error && (
        <div
          className={twMerge(
            'z-20 mb-5 flex w-full justify-between rounded-lg border border-[#571B23]/10 bg-[rgba(255,229,229,1)] p-5'
          )}
        >
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-semibold text-[#9F2225]">{state.message || 'Failed to reset password'}</p>
          </div>
        </div>
      )}

      <div className="mb-5">
        <FormLabel htmlFor="password" className="mb-2.5 inline-block">
          New Password <span className="text-base text-red-500">*</span>
        </FormLabel>
        <div className="relative">
          <FormInput
            id="password"
            className="w-full pr-12"
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <div className="mb-5">
        <FormLabel htmlFor="confirm_password" className="mb-2.5 inline-block">
          Confirm New Password <span className="text-base text-red-500">*</span>
        </FormLabel>
        <div className="relative">
          <FormInput
            id="confirm_password"
            className="w-full pr-12"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirm_password"
            required
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <div>
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {isPending ? 'Resetting...' : 'Reset Password'}
        </Button>
      </div>
    </form>
  );
}
