'use client';

import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { CategoryTree } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import arrayToTree from 'array-to-tree';
import { CategoryItem } from './category-item';
import * as Accordion from '@radix-ui/react-accordion';

export function Categories() {
  const { data: categoriesTree } = useSuspenseQuery<CategoryTree[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiFetchWithoutAuth('/wc/store/v1/products/categories?hide_empty=false');
      if (!response.ok) {
        return null;
      }
      const categories = await response.json();
      return categories;
    },
    select: (data) =>
      arrayToTree(data, {
        parentProperty: 'parent',
      }),
  });

  return (
    <Accordion.Item value="categories" className="pb-5">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between">
          <h3 className="font-satoshi-bold text-xl text-black">Categories</h3>
          <svg
            className="transition-transform duration-250 ease-linear group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.4694 9.96945L7.4694 4.96945C7.53908 4.89953 7.62187 4.84405 7.71304 4.8062C7.8042 4.76834 7.90194 4.74886 8.00065 4.74886C8.09936 4.74886 8.1971 4.76834 8.28827 4.8062C8.37943 4.84405 8.46222 4.89953 8.5319 4.96945L13.5319 9.96945C13.6728 10.1103 13.752 10.3014 13.752 10.5007C13.752 10.7 13.6728 10.8911 13.5319 11.0319C13.391 11.1728 13.1999 11.252 13.0007 11.252C12.8014 11.252 12.6103 11.1728 12.4694 11.0319L8.00003 6.56257L3.53065 11.0326C3.38976 11.1735 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1735 2.46815 11.0326C2.32726 10.8917 2.2481 10.7006 2.2481 10.5013C2.2481 10.3021 2.32726 10.111 2.46815 9.97007L2.4694 9.96945Z"
              fill="black"
            />
          </svg>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pt-3">
          <ul className="space-y-3 text-base text-black/60">
            {categoriesTree.map((cat) => {
              return <CategoryItem key={cat.id} cat={cat} />;
            })}
          </ul>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
