'use client';

import { Product } from '@/features/product/types';
import { useProductLayoutContext } from '@/features/product/components/product-layout-context';
import { ProductItem } from '@/features/product/components/product-item';

type ProductList = {
  products: Product[];
};

export function ProductList({ products }: ProductList) {
  const { layout } = useProductLayoutContext();

  if (layout === 'list') {
    return <h2>List</h2>;
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
}
