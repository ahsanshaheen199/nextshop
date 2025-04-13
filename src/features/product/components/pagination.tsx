'use client';

import { useOptimistic, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchParams } from '@/types';
import { ArrowRight } from '@/components/icons/arrow-right';

type Props = {
  totalPages: number;
  searchParamsValue: SearchParams;
};

export function Pagination({ totalPages, searchParamsValue }: Props) {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useOptimistic<number, number>(
    searchParamsValue?.page ? Number(searchParamsValue['page']) : 1,
    (_, page) => {
      return page;
    }
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const onPageChange = (page: number) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.delete('page');
    urlSearchParams.set('page', page.toString());
    startTransition(() => {
      setCurrentPage(page);
      router.push(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
    });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageNumbers = () => {
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
  };

  return (
    <div className="flex justify-between">
      <button
        className="group inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-black/10 px-3.5 py-2 font-satoshi-medium text-sm text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
      >
        <ArrowRight className="rotate-180 fill-black group-hover:fill-black" /> Prev
      </button>
      <div>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => (typeof page === 'number' ? handlePageChange(page) : null)}
            className={`h-10 w-10 cursor-pointer rounded-lg font-satoshi-medium text-sm text-black/50 disabled:cursor-not-allowed ${currentPage === page ? 'bg-[rgba(0,0,0,0.06)] text-black' : ''}`}
            disabled={page === '...' || isPending}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="group inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-black/10 px-3.5 py-2 font-satoshi-medium text-sm text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
      >
        Next <ArrowRight className="fill-black group-hover:fill-black" />
      </button>
    </div>
  );
}
