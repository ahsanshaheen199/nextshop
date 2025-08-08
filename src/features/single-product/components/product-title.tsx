import { getProduct } from '../api';

export async function ProductTitle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <h2 className="mb-3 font-integral-bold text-2xl leading-[1.17] lg:mb-3.5 lg:text-[2.5rem]">{product.name}</h2>;
}
