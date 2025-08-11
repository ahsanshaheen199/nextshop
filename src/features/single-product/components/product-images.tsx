import { getProduct } from '../api';
import { ProductImage } from './product-image';

export async function ProductImages({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductImage product={product} />;
}
