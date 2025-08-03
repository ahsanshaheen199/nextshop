'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Rating } from '@/features/product/components/rating';
import { calculateDiscountPercentage } from '@/utlis';
import { useCart } from '@/providers/cart-provider';
import { addToCart } from '@/features/cart/actions';
import { ProductResponseItem } from '@/types/product-response';
import { useActionState } from 'react';

type Props = {
  product: ProductResponseItem;
};

export function ProductItem({ product }: Props) {
  const [state, formAction, isPending] = useActionState(addToCart, null);
  const addItemAction = formAction.bind(null, { productId: product.id.toString(), quantity: 1 });
  const { addCartItem } = useCart();

  return (
    <div className="group/product-item relative mb-5 overflow-hidden">
      {product.images.length > 0 ? (
        <div className="rounded-[20px]">
          <Link href={`/products/${product.slug}`} className="group/product-item-link relative block overflow-hidden">
            <Image
              loading={'eager'}
              width={400}
              height={400}
              alt={product.name}
              src={product.images[0].thumbnail}
              sizes={product.images[0].sizes}
              className="rounded-[20px]"
            />
            {product.images.length > 1 ? (
              <Image
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
      ) : (
        <div className="rounded-[20px]">
          <Link href={`/products/${product.slug}`} className="group/product-item-link relative block overflow-hidden">
            <Image
              loading={'eager'}
              width={400}
              height={400}
              alt={product.name}
              src={'/woocommerce-placeholder.png'}
              className="rounded-[20px] border border-black/10"
            />
          </Link>
        </div>
      )}

      <div className="flex flex-col items-center bg-white p-4 transition-transform group-hover/product-item:-translate-y-[2.2rem]">
        <h2 className="mb-2 font-satoshi-bold text-base leading-none text-ellipsis text-black hover:text-black/60 lg:text-xl lg:text-clip">
          <Link prefetch={true} href={`/products/${product.slug}`}>
            {product.name}
          </Link>
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
          {product.type === 'simple' && product.is_in_stock ? (
            <form
              action={async () => {
                addCartItem(product.id.toString(), 1, [], product);
                await addItemAction();
              }}
            >
              <button
                type="submit"
                disabled={isPending}
                className="w-auto cursor-pointer rounded-full border border-black bg-black px-7 py-3 font-satoshi-medium text-base text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>
              <p aria-live="polite" className="sr-only" role="status">
                {state?.success || state?.error}
              </p>
            </form>
          ) : null}
          {product.type === 'simple' && !product.is_in_stock ? (
            <button
              disabled={true}
              className="w-auto cursor-pointer rounded-full border border-black bg-black px-7 py-3 font-satoshi-medium text-base text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Out of Stock
            </button>
          ) : null}
          {product.type === 'grouped' ? (
            <Link
              href={`/products/${product.slug}`}
              className="w-auto cursor-pointer rounded-full border border-black bg-black px-7 py-3 font-satoshi-medium text-base text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              View Products
            </Link>
          ) : null}
          {product.type === 'variable' ? (
            <Link
              href={`/products/${product.slug}`}
              className="w-auto cursor-pointer rounded-full border border-black bg-black px-7 py-3 font-satoshi-medium text-base text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Select Options
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
