import { Params } from '@/types';
import { getOrder } from '@/features/my-account/api';

export async function OrderSummary({ params }: { params: Params<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <span className="mb-1 block text-sm text-black/60">Order Number</span>
        <span className="block text-sm font-semibold">{order.id}</span>
      </div>
      <div>
        <span className="mb-1 block text-sm text-black/60">Order Date</span>
        <span className="block text-sm font-semibold">{`${new Date(order.date_created).getDate()} ${
          monthNames[new Date(order.date_created).getMonth()]
        }, ${new Date(order.date_created).getFullYear()}`}</span>
      </div>
      <div>
        <span className="mb-1 block text-sm text-black/60">Payment Method</span>
        <span className="block text-sm font-semibold">{order.payment_method_title}</span>
      </div>
      <div>
        <span className="mb-1 block text-sm text-black/60">Address</span>
        <span className="block text-sm font-semibold">{`${order.billing.address_1}`}</span>
      </div>
    </div>
  );
}
