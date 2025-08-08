import { getBestSellingProducts } from '@/features/product/api';
import { ProductsCarousel } from '@/features/single-product/components/products-carousel';

export async function BestSelling() {
  const products = await getBestSellingProducts();
  if (!products || products.length === 0) return null;

  return <ProductsCarousel products={products} />;
}
