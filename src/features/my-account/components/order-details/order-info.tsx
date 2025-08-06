import { Params } from '@/types';
import { getOrder } from '../../api';

export async function OrderInfo({ params }: { params: Params<{ orderId: string }> }) {
  const { orderId } = await params;

  const order = await getOrder(orderId);

  const date = new Date(order?.date_created);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <p className="mb-8 text-base text-black/60">
      Order <span className="font-semibold text-black">#{orderId}</span> was placed on{' '}
      <span className="font-semibold text-black">{formattedDate}</span> and is currently{' '}
      <span className="font-semibold text-black capitalize">{order?.status}</span>.
    </p>
  );
}
