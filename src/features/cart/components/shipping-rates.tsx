import { CartShippingRate } from '@/types/cart';
import { ShippingRateItem } from './shipping-rate-item';

export function ShippingRates({ rate }: { rate: CartShippingRate }) {
  return (
    <ul className="mt-3 flex flex-col gap-y-2">
      {rate.shipping_rates.map((shippingRate, index) => {
        return <ShippingRateItem key={index} shippingRate={shippingRate} rate={rate} />;
      })}
    </ul>
  );
}
