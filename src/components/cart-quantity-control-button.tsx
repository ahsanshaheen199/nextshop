import { updateCart } from '@/features/cart/actions';
import { useCart } from '@/providers/cart-provider';
import { CartResponseItem } from '@/types/cart-response';
import { useActionState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  type: 'plus' | 'minus';
  item: CartResponseItem;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export function CartQuantityControlButton({ type, item, children, className, disabled }: Props) {
  const { updateCartItem } = useCart();
  const [state, action] = useActionState(updateCart, null);
  // const toast = useToast();
  const updateItemInCart = action.bind(null, {
    key: item.key,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1,
  });

  useEffect(() => {
    if (state?.error) {
      console.log(state);
    }
  }, [state]);
  return (
    <form
      action={async () => {
        updateCartItem(item.id.toString(), type === 'plus' ? item.quantity + 1 : item.quantity - 1);
        await updateItemInCart();
      }}
      className="flex items-center"
    >
      <button
        className={twMerge('w-auto cursor-pointer disabled:cursor-not-allowed', className)}
        type="submit"
        disabled={disabled}
      >
        {children}
      </button>
    </form>
  );
}
