import { verifySession } from '@/dal/session';
import { getOrders } from '../api';
import { jwtDecode } from 'jwt-decode';
import { NoOrdersFound } from './no-orders-found';
import Link from 'next/link';
import { PayButton } from './pay-button';
import { CancelButton } from './cancel-button';

export async function Orders() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session) as { data: { user: { id: number } } };

  const { orders } = await getOrders(decodedSession.data.user.id);

  if (orders.length === 0) {
    return <NoOrdersFound />;
  }

  return (
    <div className="rounded-2xl border border-black/10">
      <div className="overflow-x-auto">
        <table className="relative min-w-full divide-y divide-black/10">
          <thead>
            <tr>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Order
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Date
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Total
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {orders.map((order) => {
              const formattedDate = new Date(order.date_created).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              const totalItems = order.line_items.reduce((acc, item) => acc + item.quantity, 0);

              return (
                <tr key={order.id}>
                  <td className="px-3 py-4 text-center text-sm font-medium whitespace-nowrap">
                    <Link href={`/my-account/orders/${order.id}`} className="text-black underline">
                      #{order.id}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-center text-sm whitespace-nowrap">{formattedDate}</td>
                  <td className="px-3 py-4 text-center text-sm whitespace-nowrap capitalize">
                    {order.status.split('-').join(' ')}
                  </td>
                  <td className="px-3 py-4 text-center text-sm whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      {order.refunds.length > 0 && (
                        <del>
                          {order.currency_symbol}
                          {parseFloat(order.total).toFixed(2)}
                        </del>
                      )}
                      <p>
                        <span>
                          {order.currency_symbol}
                          {order.refunds.length > 0
                            ? (
                                parseFloat(order.total) -
                                order.refunds.reduce((acc, refund) => acc + Math.abs(parseFloat(refund.total)), 0)
                              ).toFixed(2)
                            : parseFloat(order.total).toFixed(2)}{' '}
                        </span>
                        for {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center text-sm whitespace-nowrap">
                    <div className="flex flex-col items-center gap-2">
                      {order.needs_payment && <PayButton payment_url={order.payment_url} />}
                      <Link
                        className="inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-7 py-3 font-satoshi-medium text-sm text-white hover:bg-black/80 disabled:opacity-50 lg:px-10 lg:text-base"
                        href={`/my-account/orders/${order.id}`}
                      >
                        View
                      </Link>
                      {(order.status === 'pending' || order.status === 'failed') && <CancelButton orderId={order.id} />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
