import * as Tabs from '@radix-ui/react-tabs';
import { Product } from '@/features/product/types';

type Props = {
  product: Product;
};

export function SingleProductTabs({ product }: Props) {
  return (
    <Tabs.Root defaultValue="description">
      <Tabs.List className="mb-6 grid grid-cols-3 border-b border-black/10" aria-label="single products tabs">
        <Tabs.Trigger
          className="col-span-1 cursor-pointer pb-5 text-center font-satoshi text-base text-black/60 hover:text-black data-[state=active]:border-b-[2] data-[state=active]:border-black data-[state=active]:font-satoshi-medium data-[state=active]:text-black lg:pb-6 lg:text-xl"
          value="description"
        >
          Description
        </Tabs.Trigger>
        <Tabs.Trigger
          className="col-span-1 cursor-pointer pb-5 text-center font-satoshi text-base text-black/60 hover:text-black data-[state=active]:border-b-[2] data-[state=active]:border-black data-[state=active]:font-satoshi-medium data-[state=active]:text-black lg:pb-6 lg:text-xl"
          value="tab2"
        >
          Two
        </Tabs.Trigger>
        <Tabs.Trigger
          className="col-span-1 cursor-pointer pb-5 text-center font-satoshi text-base text-black/60 hover:text-black data-[state=active]:border-b-[2] data-[state=active]:border-black data-[state=active]:font-satoshi-medium data-[state=active]:text-black lg:pb-6 lg:text-xl"
          value="tab3"
        >
          Three
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        dangerouslySetInnerHTML={{ __html: product.description }}
        className="[&_p]:mb-2.5 [&_p]:font-satoshi [&_p]:text-sm [&_p]:leading-[1.43] [&_p]:text-black/60 [&_p]:lg:text-base [&_p]:lg:leading-[1.38] [&_p:last-child]:mb-0"
        value="description"
      />
      <Tabs.Content value="tab2">Tab two content</Tabs.Content>
      <Tabs.Content value="tab3">Tab three content</Tabs.Content>
    </Tabs.Root>
  );
}
