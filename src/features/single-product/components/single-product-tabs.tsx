'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { Product } from '@/features/product/types';
import { useMemo } from 'react';

type Props = {
  product: Product;
  isReviewEnabled: boolean;
};

export function SingleProductTabs({ product, isReviewEnabled }: Props) {
  const showAdditionalTab = useMemo(() => {
    return !(
      product.extensions['next-woo-helper-custom-product-data'].dimensions.length === '' &&
      product.extensions['next-woo-helper-custom-product-data'].dimensions.height === '' &&
      product.extensions['next-woo-helper-custom-product-data'].dimensions.width === '' &&
      product.attributes.length === 0
    );
  }, [product]);

  return (
    <Tabs.Root defaultValue="description">
      <Tabs.List className="mb-6 flex justify-center border-b border-black/10" aria-label="single products tabs">
        <Tabs.Trigger
          className="w-1/3 cursor-pointer pb-5 text-center font-satoshi text-base text-black/60 hover:text-black data-[state=active]:border-b-[2] data-[state=active]:border-black data-[state=active]:font-satoshi-medium data-[state=active]:text-black lg:pb-6 lg:text-xl"
          value="description"
        >
          Description
        </Tabs.Trigger>
        {showAdditionalTab && (
          <Tabs.Trigger
            className="w-1/3 cursor-pointer pb-5 text-center font-satoshi text-base text-black/60 hover:text-black data-[state=active]:border-b-[2] data-[state=active]:border-black data-[state=active]:font-satoshi-medium data-[state=active]:text-black lg:pb-6 lg:text-xl"
            value="additional"
          >
            Additional Information
          </Tabs.Trigger>
        )}
        {isReviewEnabled && (
          <Tabs.Trigger
            className="w-1/3 cursor-pointer pb-5 text-center font-satoshi text-base text-black/60 hover:text-black data-[state=active]:border-b-[2] data-[state=active]:border-black data-[state=active]:font-satoshi-medium data-[state=active]:text-black lg:pb-6 lg:text-xl"
            value="tab3"
          >
            Reviews ({product.review_count})
          </Tabs.Trigger>
        )}
      </Tabs.List>
      <Tabs.Content value="description">
        <div
          dangerouslySetInnerHTML={{ __html: product.description }}
          className="[&_p]:mb-2.5 [&_p]:font-satoshi [&_p]:text-sm [&_p]:leading-[1.43] [&_p]:text-black/60 [&_p]:lg:text-base [&_p]:lg:leading-[1.38] [&_p:last-child]:mb-0"
        />
      </Tabs.Content>
      {showAdditionalTab && (
        <Tabs.Content value="additional">
          <div className="rounded border border-black/10 [&_>div]:nth-[even]:bg-[#F0F0F0]">
            <div className="flex py-2">
              <div className="w-[180px] flex-none px-4">
                <span className="font-satoshi-bold text-xl leading-[22px] text-black">Weight</span>
              </div>
              <div className="flex-1">
                <span className="font-satoshi text-xl leading-[22px] text-black/60">
                  {product.extensions['next-woo-helper-custom-product-data'].weight}{' '}
                  {product.extensions['next-woo-helper-custom-product-data'].weight_unit}
                </span>
              </div>
            </div>
            <div className="flex py-2">
              <div className="w-[180px] flex-none px-4">
                <span className="font-satoshi-bold text-xl leading-[22px] text-black">Dimensions</span>
              </div>
              <div className="flex-1">
                <span className="font-satoshi text-xl leading-[22px] text-black/60">
                  {product.extensions['next-woo-helper-custom-product-data'].dimensions.length} {'x'}{' '}
                  {product.extensions['next-woo-helper-custom-product-data'].dimensions.width} {'x'}{' '}
                  {product.extensions['next-woo-helper-custom-product-data'].dimensions.height}{' '}
                  {product.extensions['next-woo-helper-custom-product-data'].dimensions_unit}
                </span>
              </div>
            </div>
            {product.attributes.map((attribute, index) => {
              return (
                <div key={index} className="flex py-2">
                  <div className="w-[180px] flex-none px-4">
                    <span className="font-satoshi-bold text-xl leading-[22px] text-black">{attribute.name}</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-satoshi text-xl leading-[22px] text-black/60">
                      {attribute.terms.map((term) => term.name).join(',')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Tabs.Content>
      )}

      {isReviewEnabled && <Tabs.Content value="tab3">Tab three content</Tabs.Content>}
    </Tabs.Root>
  );
}
