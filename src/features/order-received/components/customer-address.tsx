import { getCountryStates } from '@/utlis/states';
import { getCountryName } from '@/utlis/countries';
import { Params } from '@/types';
import { getOrder } from '@/features/my-account/api';

export async function CustomerAddress({ params }: { params: Params<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  return (
    <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-5">
      <div className="mb-5 rounded-2xl border border-black/10 p-6 lg:col-span-6 lg:mb-0">
        <h2 className="mb-2 font-satoshi-bold text-2xl text-black">Billing Address</h2>
        <p className="text-base text-black/60">
          {order.billing?.first_name} {order.billing?.last_name}
        </p>
        <p className="text-base text-black/60">{order.billing?.address_1}</p>
        <p className="text-base text-black/60">{order.billing?.city}</p>
        <p className="text-base text-black/60">
          {getCountryStates(order.billing?.country || '').find((state) => state.code === order.billing?.state)?.name}
        </p>
        <p className="text-base text-black/60">{order.billing?.postcode}</p>
        <p className="text-base text-black/60">{getCountryName(order.billing?.country || '')}</p>
      </div>
      <div className="rounded-2xl border border-black/10 p-6 lg:col-span-6">
        <h2 className="mb-2 font-satoshi-bold text-2xl text-black">Shipping Address</h2>
        <p className="text-base text-black/60">
          {order.shipping?.first_name} {order.shipping?.last_name}
        </p>
        <p className="text-base text-black/60">{order.shipping?.address_1}</p>
        <p className="text-base text-black/60">{order.shipping?.city}</p>
        <p className="text-base text-black/60">
          {getCountryStates(order.shipping?.country || '').find((state) => state.code === order.shipping?.state)?.name}
        </p>
        <p className="text-base text-black/60">{order.shipping?.postcode}</p>
        <p className="text-base text-black/60">{getCountryName(order.shipping?.country || '')}</p>
      </div>
    </div>
  );
}
