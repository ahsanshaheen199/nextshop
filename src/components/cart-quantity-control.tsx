import { CartResponseItem } from '@/types/cart-response';
import { twMerge } from 'tailwind-merge';
import { CartQuantityControlButton } from './cart-quantity-control-button';
import { PlusIcon } from './icons/plus';
import { MinusIcon } from './icons/minus';

type Props = {
  item: CartResponseItem;
  className?: string;
  iconClassName?: string;
};

export function CartQuantityControl({ item, className, iconClassName = 'h-4 w-4' }: Props) {
  return (
    <div
      className={twMerge(
        'inline-flex max-w-[100px] flex-none items-center rounded-full bg-[#F0F0F0] px-4 py-2',
        className
      )}
    >
      <CartQuantityControlButton
        disabled={item.quantity === 1}
        type="minus"
        item={item}
        className="w-auto cursor-pointer"
      >
        <MinusIcon className={iconClassName} />
      </CartQuantityControlButton>

      <input
        type="number"
        value={item.quantity}
        className="w-full grow-1 border-0 px-2 text-center font-satoshi-medium text-base text-black shadow-none focus:border-0 focus:outline-none"
        min="1"
        step={1}
        disabled
      />
      <CartQuantityControlButton type="plus" item={item} className="w-auto cursor-pointer">
        <PlusIcon className={iconClassName} />
      </CartQuantityControlButton>
    </div>
  );
}
