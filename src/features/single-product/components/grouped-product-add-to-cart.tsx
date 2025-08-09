import { ProductResponseItem } from '@/types/product-response';
import { GroupedProducts } from './grouped-products';
import { getGroupedProducts } from '@/features/product/api';

type Props = {
  product: ProductResponseItem;
};

export async function GroupedProductAddToCart({ product }: Props) {
  const groupedProducts = await getGroupedProducts(product.grouped_products);
  return <GroupedProducts products={groupedProducts} />;
}
