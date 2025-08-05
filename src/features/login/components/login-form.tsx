'use client';

import { Button } from '@/components/form/button';
import { FormInput } from '@/components/form/input';
import { FormLabel } from '@/components/form/label';
import { EyeIcon } from '@/components/icons/eye';
import { EyeOffIcon } from '@/components/icons/eye-off';
import { useActionState, useEffect, useState } from 'react';
import { login } from '../actions';
import { toast } from '@/components/toast';
import Link from 'next/link';
import { useRouter } from '@bprogress/next/app';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(login, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/my-account');
    }
    if (state?.error) {
      toast({
        title: state.error,
        description: 'Please try again.',
        type: 'error',
      });
    }

    if (state?.success) {
      toast({
        title: 'Success!',
        description: 'You have successfully logged in.',
        type: 'success',
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
        <FormInput id="username" className="w-full" type="text" name="username" defaultValue={state?.username || ''} />
      </div>
      <div className="mb-7">
        <div className="mb-2.5 flex justify-between">
          <FormLabel htmlFor="password" className="inline-block">
            Password <span className="text-base text-red-500">*</span>
          </FormLabel>
          <Link href="/forgot-password" className="text-sm text-black hover:text-gray-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <FormInput
            id="password"
            className="w-full"
            type={showPassword ? 'text' : 'password'}
            name="password"
            defaultValue={state?.password || ''}
          />
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
      <div>
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </form>
  );
}
