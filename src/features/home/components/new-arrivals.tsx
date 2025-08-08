import { getNewArrivalsProducts } from '@/features/product/api';
import { ProductsCarousel } from '@/features/single-product/components/products-carousel';

export async function NewArrivals() {
  const products = await getNewArrivalsProducts();
  if (!products || products.length === 0) return null;

  return <ProductsCarousel products={products} />;
}
