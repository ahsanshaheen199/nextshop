import { useCart } from '@/providers/cart-provider';
import { removeItemFromCart } from '../actions';
import { TrashIcon } from '@/components/icons/trash';
import { useActionState } from 'react';
import { twMerge } from 'tailwind-merge';

export const CartRemoveBtn = ({
  itemKey,
  className,
  buttonClassName,
}: {
  itemKey: string;
  className?: string;
  buttonClassName?: string;
}) => {
  const { removeCartItem } = useCart();
  const [state, formAction] = useActionState(removeItemFromCart, null);
  const removeItemFromCartAction = formAction.bind(null, { key: itemKey });

  return (
    <form
      action={async () => {
        removeCartItem(itemKey);

        await removeItemFromCartAction();
      }}
      className={twMerge('mt-0.5', className)}
    >
      <button className={twMerge('cursor-pointer', buttonClassName)} type="submit">
        <TrashIcon className="h-5 w-5 text-[#FF3333]" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.success || state?.error}
      </p>
    </form>
  );
};
