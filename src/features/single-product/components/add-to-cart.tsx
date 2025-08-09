import { getProduct } from '../api';
import { SimpleProductAddToCart } from './simple-product-add-to-cart';
import { ExternalProductAddToCart } from './external-product-add-to-cart';

export async function AddToCart({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (product.type === 'simple') {
    return <SimpleProductAddToCart product={product} />;
  }

  if (product.type === 'external') {
    return <ExternalProductAddToCart product={product} />;
  }

  return <div>AddToCart</div>;
}
