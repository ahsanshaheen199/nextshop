import { getProduct } from '../api';
import { SimpleProductAddToCart } from './simple-product-add-to-cart';
import { ExternalProductAddToCart } from './external-product-add-to-cart';
import { GroupedProductAddToCart } from './grouped-product-add-to-cart';
import { Suspense } from 'react';
import { GroupedAddToCartSkeleton } from './grouped-add-to-cart-skeleton';
import { VariableProductAddToCart } from './variable-product-add-to-cart';

export async function AddToCart({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (product.type === 'simple') {
    return <SimpleProductAddToCart product={product} />;
  }

  if (product.type === 'external') {
    return <ExternalProductAddToCart product={product} />;
  }

  if (product.type === 'grouped') {
    return (
      <Suspense fallback={<GroupedAddToCartSkeleton />}>
        <GroupedProductAddToCart product={product} />
      </Suspense>
    );
  }

  if (product.type === 'variable') {
    return (
      <Suspense>
        <VariableProductAddToCart product={product} />
      </Suspense>
    );
  }

  return null;
}
