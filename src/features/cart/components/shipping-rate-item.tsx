import { formatPrice } from '@/utlis';
import { useTransition } from 'react';
import { updateShippingRate } from '../actions';
import { CartShippingPackageShippingRate, CartShippingRate } from '@/types/cart';
import { toast } from '@/components/toast';

export function ShippingRateItem({
  shippingRate,
  rate,
  updateOptimisticRate,
}: {
  shippingRate: CartShippingPackageShippingRate;
  rate: CartShippingRate;
  updateOptimisticRate: (action: { rate_id: string }) => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex items-center gap-x-2">
      <input
        id={shippingRate.rate_id}
        type="radio"
        name="shipping"
        disabled={isPending}
        value={shippingRate.rate_id}
        checked={shippingRate.selected}
        onChange={async () => {
          startTransition(async () => {
            updateOptimisticRate({ rate_id: shippingRate.rate_id });
            const result = await updateShippingRate({
              package_id: Number(rate.package_id),
              rate_id: shippingRate.rate_id,
            });
            if (result?.error) {
              toast({
                title: 'Error',
                description: result.error,
                type: 'error',
              });
            }
          });
        }}
        className="h-4 w-4 cursor-pointer border border-black/10 text-black focus:border-black focus:ring-2 focus:ring-black disabled:cursor-not-allowed"
      />
      <label htmlFor={shippingRate.rate_id} className="flex flex-1 cursor-pointer justify-between">
        <span className="text-base text-black/60">{shippingRate.name}:</span>
        <span className="font-satoshi-bold text-base font-bold text-black">
          {formatPrice(shippingRate.price, {
            currency_minor_unit: shippingRate.currency_minor_unit,
            currency_decimal_separator: shippingRate.currency_decimal_separator,
            currency_thousand_separator: shippingRate.currency_thousand_separator,
            currency_prefix: shippingRate.currency_prefix,
            currency_suffix: shippingRate.currency_suffix,
          })}
        </span>
      </label>
      {isPending && (
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
      )}
    </li>
  );
}
