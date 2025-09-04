'use client';

import { useOptimistic, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

export function SingleTerm({
  attributeTerms,
  attribute,
}: {
  attributeTerms: { id: number; name: string; slug: string }[];
  attribute: { id: number; name: string; taxonomy: string };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedParamsObj: { page?: 1; attributes?: { attribute: string; slug: string }[] } = qs.parse(
    searchParams.toString()
  );
  const findIndexOfAttribute = parsedParamsObj?.attributes?.findIndex((attr) => attr.attribute === attribute.taxonomy);
  const [optimisticTerms, setOptimisticTerms] = useOptimistic(
    findIndexOfAttribute !== -1 && parsedParamsObj?.attributes
      ? parsedParamsObj.attributes[findIndexOfAttribute as number].slug.split(',')
      : []
  );

  const updateTerms = (terms: string[]) => {
    if (parsedParamsObj?.attributes) {
      if (findIndexOfAttribute !== -1) {
        if (terms.length) {
          parsedParamsObj.attributes[findIndexOfAttribute as number].slug = terms.join(',');
        } else {
          delete parsedParamsObj.attributes[findIndexOfAttribute as number];
        }
      } else {
        parsedParamsObj.attributes.push({ attribute: attribute.taxonomy, slug: terms.join(',') });
      }
    } else {
      parsedParamsObj['attributes'] = [{ attribute: attribute.taxonomy, slug: terms.join(',') }];
    }

    startTransition(() => {
      setOptimisticTerms(terms);
      router.push(`?${qs.stringify(parsedParamsObj, { encode: false })}`, { scroll: false });
    });
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {attributeTerms.map((term) => {
        return (
          <li
            className={twMerge(
              'cursor-pointer rounded-[62px] bg-[#F0F0F0] px-5 py-2.5 text-sm text-black/60 hover:bg-black hover:text-white',
              optimisticTerms.includes(term.slug) && 'bg-black text-white'
            )}
            key={term.id}
            onClick={() => {
              updateTerms(
                optimisticTerms.includes(term.slug)
                  ? optimisticTerms.filter((t) => t !== term.slug)
                  : [...optimisticTerms, term.slug]
              );
            }}
          >
            {term.name}
          </li>
        );
      })}
    </ul>
  );
}
