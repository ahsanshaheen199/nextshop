import { Button } from '@/components/form/button';
import { FormInput } from '@/components/form/input';
import { PromoIcon } from '@/components/icons/promo';
import { applyCoupon } from '../actions';
import { Fragment, useActionState, useEffect, useState } from 'react';

export function ApplyCoupon() {
  const [state, formAction, isPending] = useActionState(applyCoupon, null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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
            <p className="text-sm font-semibold text-[#306339]">Coupon applied successfully!</p>
          </div>
        </div>
      )}
      <form action={formAction} className="flex gap-x-3">
        <div className="relative flex-1">
          <FormInput
            name="coupon"
            className="w-full bg-[#F0F0F0] px-4 py-3 pl-12 ring-0 focus:ring-black"
            placeholder="Add coupon code"
            defaultValue={state?.coupon || ''}
          />
          <PromoIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 fill-black/40" />
        </div>

        <Button
          type="submit"
          className="px-7 py-3.5 text-sm font-medium lg:px-10 lg:text-base"
          disabled={isPending}
          isLoading={isPending}
        >
          Apply
        </Button>
      </form>
    </Fragment>
  );
}
