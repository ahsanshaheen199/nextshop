import { TrashIcon } from '@/components/icons/trash';
import { useActionState, useEffect } from 'react';
import { removeCoupon } from '../actions';
import { toast } from '@/components/toast';

export function CouponRemove({ code }: { code: string }) {
  const [state, formAction, isPending] = useActionState(removeCoupon, null);

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        type: 'error',
      });
    }
  }, [state]);

  return (
    <form className="mt-0.5" action={formAction}>
      <input type="hidden" name="code" value={code} />
      <button className="cursor-pointer" type="submit" disabled={isPending}>
        {isPending ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
        ) : (
          <TrashIcon className="h-4 w-4 text-[#FF3333]" />
        )}
      </button>
    </form>
  );
}
