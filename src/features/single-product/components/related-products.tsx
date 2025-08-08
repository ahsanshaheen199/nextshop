import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { ProductResponseItem } from '@/types/product-response';
import { ProductsCarousel } from '@/features/single-product/components/products-carousel';
import { getProduct } from '../api';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function RelatedProducts({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const ids = product.extensions['headless-helper-custom-product-data'].related_ids;

  if (ids.length === 0) {
    return null;
  }

  const response = await apiFetchWithoutAuth(`/wc/store/v1/products?include=${ids}`);

  if (!response.ok) {
    return;
  }

  const relatedProducts = (await response.json()) as ProductResponseItem[];

  return (
    <div className="mb-[30px]">
      <h2 className="mb-10 text-center font-integral-bold text-[32px] leading-[36px] text-black lg:mb-14 lg:text-5xl">
        Related Products
      </h2>
      <ProductsCarousel products={relatedProducts} />
    </div>
  );
}
