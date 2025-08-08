import { getProduct } from '../api';
import { ProductGallery } from './product-gallery';
import Image from 'next/image';

export async function ProductImages({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return product.images.length > 1 ? (
    <ProductGallery product={product} />
  ) : (
    <div className="h-[300px] w-full lg:h-[500px]">
      <Image
        width={500}
        height={500}
        className="h-full w-full rounded-[20px] object-cover"
        src={product.images[0]?.src}
        alt={product.images[0]?.alt ?? product.name}
      />
    </div>
  );
}
