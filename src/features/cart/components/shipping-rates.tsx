import { CartShippingRate } from '@/types/cart';
import { useOptimistic } from 'react';
import { ShippingRateItem } from './shipping-rate-item';

export function ShippingRates({ rate }: { rate: CartShippingRate }) {
  const [optimisticRate, updateOptimisticRate] = useOptimistic(rate, (state, action: { rate_id: string }) => {
    return {
      ...state,
      shipping_rates: state.shipping_rates.map((shippingRate) => {
        if (shippingRate.rate_id === action.rate_id) {
          return { ...shippingRate, selected: true };
        } else {
          return { ...shippingRate, selected: false };
        }
      }),
    };
  });

  return (
    <ul className="mt-3 flex flex-col gap-y-2">
      {optimisticRate.shipping_rates.map((shippingRate, index) => {
        return (
          <ShippingRateItem
            key={index}
            shippingRate={shippingRate}
            rate={optimisticRate}
            updateOptimisticRate={updateOptimisticRate}
          />
        );
      })}
    </ul>
  );
}
