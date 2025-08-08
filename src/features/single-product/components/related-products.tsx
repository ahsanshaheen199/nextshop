import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { ProductResponseItem } from '@/types/product-response';
import { ProductsCarousel } from '@/features/single-product/components/products-carousel';

type Props = {
  ids: number[];
};

export async function RelatedProducts({ ids }: Props) {
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
