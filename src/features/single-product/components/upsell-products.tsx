import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { getProduct } from '../api';
import { ProductResponseItem } from '@/types/product-response';
import { ProductsCarousel } from './products-carousel';

export async function UpsellProducts({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  const ids = product.extensions['headless-helper-custom-product-data'].upsell_ids;

  if (ids.length === 0) {
    return null;
  }

  const response = await apiFetchWithoutAuth(`/wc/store/v1/products?include=${ids}`);

  if (!response.ok) {
    return;
  }

  const upsellProducts = (await response.json()) as ProductResponseItem[];

  return (
    <div className="mb-[30px]">
      <h2 className="mb-10 text-center font-integral-bold text-[32px] leading-[36px] text-black lg:mb-14 lg:text-5xl">
        You may also like
      </h2>
      <ProductsCarousel products={upsellProducts} />
    </div>
  );
}
