import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { ProductItem } from '@/features/product/components/product-item';
import { ProductResponseItem } from '@/types/product-response';

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
      <div className="md:grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-4">
        {relatedProducts.map((product, index) => {
          if (index === 4) {
            return;
          }
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
