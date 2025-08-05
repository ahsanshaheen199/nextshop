'use client';

import { Button } from '@/components/form/button';
import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { Customer } from '@/types/user';
import { useActionState } from 'react';
import { updateCustomer } from '../actions';
import { Fragment, useEffect, useState } from 'react';
import { EyeOffIcon } from '@/components/icons/eye-off';
import { EyeIcon } from '@/components/icons/eye';

export function CustomerAccountForm({ customer }: { customer: Customer }) {
  const [state, formAction, isPending] = useActionState(updateCustomer, null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    let successTimeout: NodeJS.Timeout;
    let errorTimeout: NodeJS.Timeout;
    if (state?.success) {
      setShowSuccess(true);
      successTimeout = setTimeout(() => {
        setShowSuccess(false);
      }, 6000);
    }

    if (state?.error) {
      setShowError(true);
      errorTimeout = setTimeout(() => {
        setShowError(false);
      }, 6000);
    }

    return () => {
      clearTimeout(successTimeout);
      clearTimeout(errorTimeout);
    };
  }, [state]);

  return (
    <Fragment>
      {showError && state?.error && (
        <div className="mb-5 flex w-full justify-between rounded-lg border border-[#571B23]/10 bg-[rgba(255,229,229,1)] p-5">
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-semibold text-[#9F2225]">{state.error}</p>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="mb-5 flex w-full justify-between rounded-lg border border-[#1B5728]/10 bg-[#F2FDF5] p-5">
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-semibold text-[#306339]">Your account has been successfully updated!</p>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-black/10 p-6">
        <form action={formAction}>
          <input type="hidden" name="customerId" value={customer.id} />
          <div className="mb-5 grid grid-cols-12 gap-x-5">
            <div className="col-span-6">
              <FormLabel htmlFor="first-name" className="mb-2.5 inline-flex gap-x-1">
                First Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormInput
                id="first-name"
                className="w-full"
                type="text"
                name="firstName"
                defaultValue={customer.first_name}
              />
            </div>
            <div className="col-span-6">
              <FormLabel htmlFor="last-name" className="mb-2.5 inline-flex gap-x-1">
                Last Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormInput
                id="last-name"
                className="w-full"
                type="text"
                name="lastName"
                defaultValue={customer.last_name}
              />
            </div>
          </div>
          <div className="mb-5">
            <FormLabel htmlFor="username" className="mb-2.5 inline-flex gap-x-1">
              Username
              <span className="text-base text-red-500">*</span>
            </FormLabel>
            <FormInput id="username" className="w-full" type="text" name="username" defaultValue={customer.username} />
          </div>
          <div className="mb-5">
            <FormLabel htmlFor="email" className="mb-2.5 inline-flex gap-x-1">
              Email
              <span className="text-base text-red-500">*</span>
            </FormLabel>
            <FormInput id="email" className="w-full" type="text" name="email" defaultValue={customer.email} />
          </div>
          {customer.role !== 'administrator' && (
            <Fragment>
              <div className="mb-5">
                <FormLabel htmlFor="password" className="mb-2.5 inline-block">
                  New Password{' '}
                  <span className="text-sm text-black/60">
                    (Please leave blank if you don&apos;t want to change your password)
                  </span>
                </FormLabel>
                <div className="relative">
                  <FormInput
                    id="password"
                    className="w-full pr-12"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    defaultValue={state?.password || ''}
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
                <FormLabel htmlFor="confirmPassword" className="mb-2.5 inline-block">
                  Confirm New Password{' '}
                  <span className="text-sm text-black/60">
                    (Please leave blank if you don&apos;t want to change your password)
                  </span>
                </FormLabel>
                <div className="relative">
                  <FormInput
                    id="confirmPassword"
                    className="w-full pr-12"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    defaultValue={state?.confirmPassword || ''}
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
            </Fragment>
          )}

          <div>
            <Button type="submit" isLoading={isPending} disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
