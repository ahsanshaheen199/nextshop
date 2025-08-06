import { Params } from '@/types';
import { getOrder } from '../../api';
import { twMerge } from 'tailwind-merge';
import { getCountryStates } from '@/utlis/states';
import { getCountryName } from '@/utlis/countries';

export async function BillingShippingAddress({ params }: { params: Params<{ orderId: string }> }) {
  const { orderId } = await params;

  const order = await getOrder(orderId);

  const noShippingAddress = Object.values(order.shipping).every((value) => value === '');

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
      <div className={twMerge('mb-8 lg:col-span-6 lg:mb-0', noShippingAddress && 'lg:col-span-12')}>
        <h3 className="mb-4 font-satoshi-bold text-lg text-black">Billing Address</h3>
        <div className="rounded-2xl border border-black/10 p-4">
          <p className="text-base text-black/60">
            {order.billing.first_name} {order.billing.last_name}
          </p>
          <p className="text-base text-black/60">{order.billing.address_1}</p>
          <p className="text-base text-black/60">{order.billing.city}</p>
          <p className="text-base text-black/60">
            {getCountryStates(order.billing.country || '').find((state) => state.code === order.billing.state)?.name}
          </p>
          <p className="text-base text-black/60">{order.billing.postcode}</p>
          <p className="text-base text-black/60">{getCountryName(order.billing.country || '')}</p>
          <p className="text-base text-black/60">{order.billing.email}</p>
          <p className="text-base text-black/60">{order.billing.phone}</p>
        </div>
      </div>
      {!noShippingAddress && (
        <div className="lg:col-span-6">
          <h3 className="mb-4 font-satoshi-bold text-lg text-black">Shipping Address</h3>
          <div className="rounded-2xl border border-black/10 p-4">
            <p className="text-base text-black/60">
              {order.shipping.first_name} {order.shipping.last_name}
            </p>
            <p className="text-base text-black/60">{order.shipping.address_1}</p>
            <p className="text-base text-black/60">{order.shipping.city}</p>
            <p className="text-base text-black/60">
              {
                getCountryStates(order.shipping.country || '').find((state) => state.code === order.shipping.state)
                  ?.name
              }
            </p>
            <p className="text-base text-black/60">{order.shipping.postcode}</p>
            <p className="text-base text-black/60">{getCountryName(order.shipping.country || '')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
