import { Params } from '@/types';
import { getOrder } from '../../api';
import Link from 'next/link';
import { PayButton } from '../pay-button';
import { CancelButton } from '../cancel-button';

export async function OrderDetails({ params }: { params: Params<{ orderId: string }> }) {
  const { orderId } = await params;

  const order = await getOrder(orderId);

  return (
    <div className="mb-8">
      <h2 className="mb-4 font-satoshi-bold text-2xl text-black">Order Details</h2>

      <div className="rounded-2xl border border-black/10">
        <div className="overflow-x-auto">
          <table className="relative min-w-full divide-y divide-black/10">
            <thead>
              <tr>
                <th scope="col" className="px-3 py-3.5 text-center text-base font-semibold text-gray-900">
                  Product
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-base font-semibold text-gray-900">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {order.line_items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="flex items-center justify-center gap-x-1 px-3 py-4 text-center text-base whitespace-nowrap">
                      <Link href={`/products/${item.product_id}`} className="text-black underline">
                        {item.name}
                      </Link>
                      <span className="text-sm font-normal text-black">x</span>{' '}
                      <p className="text-base font-semibold text-black">{item.quantity}</p>
                    </td>
                    <td className="px-3 py-4 text-center text-base whitespace-nowrap text-black">
                      {order.currency_symbol}
                      {item.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="divide-y divide-black/10">
              <tr>
                <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                  <p className="font-semibold text-black">Subtotal:</p>
                </td>
                <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                  <p className="font-semibold text-black">
                    {order.currency_symbol}
                    {order.line_items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2)}
                  </p>
                </td>
              </tr>
              {order.shipping_lines.length > 0 &&
                order.shipping_lines.map((shipping, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                        <p className="font-semibold text-black">Shipping:</p>
                      </td>
                      <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                        <p className="font-semibold text-black">
                          {order.currency_symbol}
                          {parseFloat(shipping.total).toFixed(2)}{' '}
                          <span className="text-sm font-normal text-black/60">via {shipping.method_title}</span>
                        </p>
                      </td>
                    </tr>
                  );
                })}
              {order.tax_lines.length > 0 &&
                order.tax_lines.map((tax, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-3 py-4 text-center text-base whitespace-nowrap text-black/60">
                        <p className="font-semibold text-black">{tax.label}:</p>
                      </td>
                      <td className="px-3 py-4 text-center text-base whitespace-nowrap text-black/60">
                        <p className="font-semibold text-black">
                          {order.currency_symbol}
                          {(parseFloat(tax.tax_total) + parseFloat(tax.shipping_tax_total)).toFixed(2)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              {order.refunds.length > 0 &&
                order.refunds.map((refund, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-3 py-4 text-center text-base whitespace-nowrap text-black/60">
                        <p className="font-semibold text-black">Refund:</p>
                      </td>
                      <td className="px-3 py-4 text-center text-base whitespace-nowrap text-black/60">
                        <p className="font-semibold text-black">
                          -{order.currency_symbol}
                          {Math.abs(parseFloat(refund.total)).toFixed(2)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                  <p className="font-semibold text-black">Total:</p>
                </td>
                <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                  <div className="flex items-center justify-center gap-x-2 text-black">
                    {order.refunds.length > 0 && (
                      <del>
                        {order.currency_symbol}
                        {parseFloat(order.total).toFixed(2)}
                      </del>
                    )}
                    <p className="font-semibold">
                      <span>
                        {order.currency_symbol}
                        {order.refunds.length > 0
                          ? (
                              parseFloat(order.total) -
                              order.refunds.reduce((acc, refund) => acc + Math.abs(parseFloat(refund.total)), 0)
                            ).toFixed(2)
                          : parseFloat(order.total).toFixed(2)}{' '}
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                  <p className="font-semibold text-black">Payment Method:</p>
                </td>
                <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                  <p className="font-semibold text-black">{order.payment_method_title}</p>
                </td>
              </tr>
              {(order.needs_payment || order.status === 'pending' || order.status === 'failed') && (
                <tr>
                  <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                    <p className="font-semibold text-black">Actions:</p>
                  </td>
                  <td className="px-3 py-4 text-center text-base whitespace-nowrap">
                    <div className="flex items-center justify-center gap-x-2">
                      {order.needs_payment && <PayButton payment_url={order.payment_url} />}
                      {(order.status === 'pending' || order.status === 'failed') && <CancelButton orderId={order.id} />}
                    </div>
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
