import { Rating } from '@/features/product/components/rating';
import { getProduct } from '../api';

export async function ProductRating({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return !isNaN(Number(product.average_rating)) && Number(product.average_rating) > 0 ? (
    <div className="mb-3 flex items-center gap-x-3.5 lg:mb-3.5">
      <Rating
        fullStarClassName={'lg:w-6 lg:h-6 w-4 h-4'}
        halfStarClassName={'lg:w-[11px] lg:h-[22px] w-2 h-4'}
        averageRating={isNaN(Number(product.average_rating)) ? 0 : Number(product.average_rating)}
      />
      <p className="mt-0.5 font-satoshi text-sm text-black">
        <span>{Number(product.average_rating)}/</span>
        <span className="text-black/60">5</span>
      </p>
    </div>
  ) : null;
}
