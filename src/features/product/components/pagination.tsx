'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowRight } from '@/components/icons/arrow-right';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

type Props = {
  totalPages: number;
};

export function Pagination({ totalPages }: Props) {
  const searchParams = useSearchParams();

  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const pathname = usePathname();

  const getPageLink = (page: number) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.delete('page');
    urlSearchParams.set('page', page.toString());
    return `${pathname}?${urlSearchParams.toString()}`;
  };

  const getPageNumbers = useCallback(() => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Show ellipsis after first page if current page is > 3 and total pages > 5
    if (currentPage > 3 && totalPages > 5) {
      pages.push('...');
    }

    // Calculate start and end page numbers
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the start or end
    if (currentPage <= 3) {
      end = Math.min(5, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 4, 2);
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Show ellipsis before last page if current page is < totalPages - 2 and totalPages > 5
    if (currentPage < totalPages - 2 && totalPages > 5) {
      pages.push('...');
    }

    // Always show last page if there is more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-between">
      {currentPage === 1 ? (
        <button
          className="group inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-black/10 px-2.5 py-2 font-satoshi-medium text-xs text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed md:px-3.5 md:text-sm"
          disabled={true}
        >
          <ArrowRight className="rotate-180 fill-black group-hover:fill-black" /> Prev
        </button>
      ) : (
        <Link
          prefetch={true}
          className="group inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-black/10 px-2.5 py-2 font-satoshi-medium text-xs text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed md:px-3.5 md:text-sm"
          href={getPageLink(currentPage - 1)}
        >
          <ArrowRight className="rotate-180 fill-black group-hover:fill-black" /> Prev
        </Link>
      )}

      <div>
        {getPageNumbers().map((page, index) => {
          if (page !== '...') {
            return (
              <Link
                prefetch={true}
                href={getPageLink(Number(page))}
                key={index}
                onClick={() => (typeof page === 'number' ? getPageLink(page) : null)}
                className={twMerge(
                  `inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg font-satoshi-medium text-xs text-black/50 disabled:cursor-not-allowed md:h-10 md:w-10 md:text-sm`,
                  currentPage === page && 'bg-[rgba(0,0,0,0.06)] text-black'
                )}
              >
                {page}
              </Link>
            );
          } else {
            return (
              <span
                key={index}
                className={twMerge(
                  `inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg font-satoshi-medium text-xs text-black/50 disabled:cursor-not-allowed md:h-10 md:w-10 md:text-sm`
                )}
              >
                {page}
              </span>
            );
          }
        })}
      </div>
      {currentPage === totalPages ? (
        <button
          className="group inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-black/10 px-2.5 py-2 font-satoshi-medium text-xs text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed md:px-3.5 md:text-sm"
          disabled={true}
        >
          Next <ArrowRight className="fill-black group-hover:fill-black" />
        </button>
      ) : (
        <Link
          prefetch={true}
          className="group inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-black/10 px-2.5 py-2 font-satoshi-medium text-xs text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed md:px-3.5 md:text-sm"
          href={getPageLink(currentPage + 1)}
        >
          Next <ArrowRight className="fill-black group-hover:fill-black" />
        </Link>
      )}
    </div>
  );
}
