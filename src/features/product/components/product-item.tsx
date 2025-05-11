import { Product } from '@/features/product/types';
import Link from 'next/link';
import Image from 'next/image';
import { Rating } from '@/features/product/components/rating';
import { calculateDiscountPercentage } from '@/utlis';

type Props = {
  product: Product;
};

export function ProductItem({ product }: Props) {
  return (
    <div className="group/product-item relative mb-5 overflow-hidden">
      {product.images.length > 0 ? (
        <div className="rounded-[20px]">
          <Link prefetch={true} href={`/products/${product.slug}`} className="group/product-item-link relative block overflow-hidden">
            <Image
              width={400}
              height={400}
              alt={product.name}
              src={product.images[0].thumbnail}
              sizes={product.images[0].sizes}
              className="rounded-[20px]"
            />
            {product.images.length > 1 ? (
              <Image
                loading={'eager'}
                width={400}
                height={400}
                alt={product.name}
                src={product.images[1].thumbnail}
                sizes={product.images[1].sizes}
                className="absolute inset-0 h-full w-full rounded-[20px] object-cover opacity-0 transition-opacity group-hover/product-item-link:opacity-100"
              />
            ) : null}
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col items-center bg-white p-4 transition-transform group-hover/product-item:-translate-y-[2.2rem]">
        <h2 className="mb-2 font-satoshi-bold text-base leading-none text-ellipsis text-black hover:text-black/60 lg:text-xl lg:text-clip">
          <Link prefetch={true} href={`/products/${product.slug}`}>{product.name}</Link>
        </h2>
        {!isNaN(Number(product.average_rating)) && Number(product.average_rating) > 0 ? (
          <div className="mb-2 flex items-center gap-x-3.5">
            <Rating
              fullStarClassName={'w-[19px] h-[17px]'}
              halfStarClassName={'w-[9px] h-[17px]'}
              averageRating={isNaN(Number(product.average_rating)) ? 0 : Number(product.average_rating)}
            />
            <p className="mt-0.5 font-satoshi text-sm text-black">
              <span>{Number(product.average_rating)}/</span>
              <span className="text-black/60">5</span>
            </p>
          </div>
        ) : null}

        <div className="mb-4 flex items-center gap-2.5">
          <p
            className="flex items-center gap-x-2.5 font-satoshi-bold text-base leading-none lg:text-lg [&_del]:order-2 [&_del]:text-black/40 [&_ins]:order-1 [&_ins]:text-black [&_ins]:no-underline"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          ></p>
          {['external', 'simple'].includes(product.type) &&
            (product.on_sale ? (
              <span className="rounded-full bg-[rgba(255,51,51,.10)] px-2 py-1 font-satoshi-medium text-[10px] text-[#FF3333] lg:px-3 lg:py-1.5 lg:text-xs">
                -{calculateDiscountPercentage(product.prices)}%
              </span>
            ) : null)}
        </div>
        <div className="flex w-full justify-center bg-white transition-opacity group-hover/product-item:opacity-100 lg:absolute lg:bottom-[-2.2rem] lg:opacity-0">
          <button className="w-auto cursor-pointer rounded-full border border-black bg-black px-7 py-3 font-satoshi-medium text-base text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
