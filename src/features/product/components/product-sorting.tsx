'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

const sortArr = [
  { title: 'Default', value: 'default' },
  { title: 'Popularity', value: 'popularity' },
  { title: 'Rating', value: 'rating' },
  { title: 'Price: low to high', value: 'price' },
  { title: 'Price: high to low', value: 'price-desc' },
];

export function ProductSorting({ sortBy = 'default' }: { sortBy: string }) {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-2 text-base">
      <span className="text-black/60">Sort By:</span>
      <Select.Root
        defaultValue={sortBy}
        disabled={isPending}
        onValueChange={(value) => {
          setTransition(() => {
            let url = `/shop`;
            const urlSearchParams = new URLSearchParams();
            urlSearchParams.delete('orderby');
            urlSearchParams.set('orderby', value);
            urlSearchParams.set('page', '1');

            router.push(`${url}?${urlSearchParams.toString()}`, { scroll: false });
          });
        }}
      >
        <Select.Trigger className="flex cursor-pointer items-center gap-x-3 font-satoshi-medium text-black focus:outline-none disabled:cursor-not-allowed">
          <Select.Value className="text-black" placeholder="Select product ordering" />
          <Select.Icon className="mt-0.5 text-black">
            <ChevronDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            sideOffset={10}
            alignOffset={-60}
            position="popper"
            className="z-10 w-full max-w-[240px] overflow-hidden rounded bg-white py-1 shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
          >
            <Select.Viewport className="p-[5px]">
              {sortArr.map((item, index) => {
                return (
                  <Select.Item
                    className="cursor-pointer px-4 py-2 leading-none text-black/60 outline-none select-none hover:text-black"
                    key={index}
                    value={item.value}
                  >
                    <Select.ItemText>{item.title}</Select.ItemText>
                  </Select.Item>
                );
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
