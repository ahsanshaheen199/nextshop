'use client';

import { useProductLayoutContext } from '@/features/product/components/product-layout-context';
import { ProductItem } from '@/features/product/components/product-item';
import { ProductItemList } from '@/features/product/components/product-item-list';
import { ProductResponseItem } from '@/types/product-response';

type ProductList = {
  products: ProductResponseItem[];
};

export function ProductList({ products }: ProductList) {
  const { layout } = useProductLayoutContext();

  if (layout === 'list') {
    return (
      <div className="flex flex-col">
        {products.map((product) => {
          return <ProductItemList key={product.id} product={product} />;
        })}
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
}
