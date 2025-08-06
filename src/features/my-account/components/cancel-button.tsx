'use client';

import { Button } from '@/components/form/button';
import { useActionState } from 'react';
import { cancelOrder } from '../actions';
import { useEffect } from 'react';
import { toast } from '@/components/toast';

export function CancelButton({ orderId }: { orderId: number }) {
  const [state, formAction, isPending] = useActionState(cancelOrder, null);
  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Order cancelled',
        description: 'Your order has been cancelled',
        type: 'success',
      });
    }
  }, [state]);

  if (state?.error) {
    toast({
      title: 'Error',
      description: state.error,
      type: 'error',
    });
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="orderId" value={orderId} />
      <Button type="submit" isLoading={isPending} disabled={isPending}>
        {isPending ? 'Cancelling...' : 'Cancel'}
      </Button>
    </form>
  );
}
