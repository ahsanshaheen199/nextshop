import { calculateDiscountPercentage } from '@/utlis';
import { getProduct } from '../api';

export async function ProductOnSale({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="mb-3 flex items-center gap-x-3">
      <p
        className="flex items-center gap-x-2.5 font-satoshi-bold text-2xl leading-none lg:text-[2rem] [&_del]:order-2 [&_del]:text-black/40 [&_ins]:order-1 [&_ins]:text-black [&_ins]:no-underline"
        dangerouslySetInnerHTML={{ __html: product.price_html }}
      ></p>
      {['external', 'simple'].includes(product.type) &&
        (product.on_sale ? (
          <span className="rounded-full bg-[rgba(255,51,51,.10)] px-3 py-1.5 font-satoshi-medium text-sm text-[#FF3333] lg:px-3.5 lg:text-base">
            -{calculateDiscountPercentage(product.prices)}%
          </span>
        ) : null)}
    </div>
  );
}
