import { Params } from '@/types';
import { getOrder } from '@/features/my-account/api';
import { isEmpty } from '@/utlis';

export async function OrderDetails({ params }: { params: Params<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  return (
    <div className="divide-y divide-black/10">
      <div className="flex justify-between py-3">
        <p className="text-lg text-black/60">Product</p>
        <p className="font-satoshi-bold text-lg font-bold text-black">Total</p>
      </div>
      {order.line_items.map((item) => {
        return (
          <div className="flex justify-between py-3" key={item.id}>
            <p className="text-lg text-black/60">
              {item.name} x {item.quantity}
            </p>
            <p className="text-lg text-black/60">
              {order.currency_symbol}
              {item.total}
            </p>
          </div>
        );
      })}
      <div className="flex justify-between py-3">
        <p className="text-lg text-black/60">Subtotal</p>
        <p className="font-satoshi-bold text-lg font-bold text-black">
          {order.currency_symbol}
          {order.line_items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between py-3">
        <p className="text-lg text-black/60">Shipping Fee</p>
        <p className="font-satoshi-bold text-lg font-bold text-black">
          {order.currency_symbol}
          {order.shipping_total}
        </p>
      </div>
      <div className="flex justify-between py-3">
        <p className="text-lg text-black/60">Tax</p>
        <p className="font-satoshi-bold text-lg font-bold text-black">
          {order.currency_symbol}
          {order.total_tax}
        </p>
      </div>
      <div className="flex justify-between py-3">
        <p className="text-lg text-black/60">Payment Method</p>
        <p className="font-satoshi-bold text-lg font-bold text-black">{order.payment_method_title}</p>
      </div>
      <div className="flex justify-between py-3">
        <p className="text-lg text-black/60">Total</p>
        <p className="font-satoshi-bold text-lg font-bold text-black">
          {order.currency_symbol}
          {order.total}
        </p>
      </div>
      {!isEmpty(order.customer_note) && (
        <div className="flex justify-between py-3">
          <p className="text-lg text-black/60">Note:</p>
          <p className="text-base text-black">{order.customer_note}</p>
        </div>
      )}
    </div>
  );
}
