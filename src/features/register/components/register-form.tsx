'use client';

import { Button } from '@/components/form/button';
import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { EyeIcon } from '@/components/icons/eye';
import { EyeOffIcon } from '@/components/icons/eye-off';
import { useActionState, useEffect, useState } from 'react';
import { register } from '../actions';
import { toast } from '@/components/toast';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(register, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/my-account');
      toast({
        title: 'Success!',
        description: 'You have successfully created your account.',
        type: 'success',
      });
    }
    if (state?.error) {
      toast({
        title: state.error,
        description: 'Please try again.',
        type: 'error',
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mb-5">
        <FormLabel htmlFor="username" className="mb-2.5 inline-flex gap-x-1">
          Username
          <span className="text-base text-red-500">*</span>
        </FormLabel>
        <FormInput id="username" className="w-full" type="text" name="username" defaultValue={state?.username} />
      </div>
      <div className="mb-5 grid grid-cols-12 gap-x-5">
        <div className="col-span-6">
          <FormLabel htmlFor="first-name" className="mb-2.5 inline-flex gap-x-1">
            First Name
          </FormLabel>
          <FormInput id="first-name" className="w-full" type="text" name="first_name" />
        </div>
        <div className="col-span-6">
          <FormLabel htmlFor="last-name" className="mb-2.5 inline-flex gap-x-1">
            Last Name
          </FormLabel>
          <FormInput id="last-name" className="w-full" type="text" name="last_name" />
        </div>
      </div>
      <div className="mb-5">
        <FormLabel htmlFor="email" className="mb-2.5 inline-block">
          Email <span className="text-base text-red-500">*</span>
        </FormLabel>
        <FormInput id="email" className="w-full" type="email" name="email" />
      </div>
      <div className="mb-5">
        <FormLabel htmlFor="password" className="mb-2.5 inline-block">
          Password <span className="text-base text-red-500">*</span>
        </FormLabel>
        <div className="relative">
          <FormInput id="password" className="w-full" type={showPassword ? 'text' : 'password'} name="password" />
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl"
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
      <div className="mb-7">
        <FormLabel htmlFor="confirm-password" className="mb-2.5 inline-block">
          Confirm Password <span className="text-base text-red-500">*</span>
        </FormLabel>
        <div className="relative">
          <FormInput
            id="confirm-password"
            className="w-full"
            type={confirmShowPassword ? 'text' : 'password'}
            name="confirm_password"
          />
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl"
            type="button"
            onClick={() => {
              setConfirmShowPassword((prev) => !prev);
            }}
          >
            {confirmShowPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
      <div>
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {isPending ? 'Creating account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
}
