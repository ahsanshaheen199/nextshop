'use client';

import { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '../icons/search';
import { useRouter } from 'next/navigation';
import { Product } from '@/features/product/types';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Cross } from '../icons/cross';

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setProducts([]);
    } else {
      setIsLoading(true);

      const searchedFor = searchTerm;
      apiFetchWithoutAuth(`/wc/store/v1/products?search=${searchTerm}`).then(async (response) => {
        if (searchedFor !== inputRef.current?.value) {
          return;
        }

        const result: Product[] = await response.json();
        setIsLoading(false);
        setProducts(result);
      });
    }
  }, [searchTerm, inputRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleHighlightedIndex = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex < products.length - 1 ? prevIndex + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : products.length - 1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      router.push(`/products/${products[highlightedIndex].slug}`);
      setSearchTerm(products[highlightedIndex].name);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div className="relative">
        <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
        <input
          value={searchTerm}
          ref={inputRef}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(e.target.value.length > 0);
            setHighlightedIndex(-1);
          }}
          className="w-full rounded-full bg-[#F0F0F0] py-3 pr-4 pl-12 text-sm text-black outline-none placeholder:text-black/40 lg:pl-[52px] lg:text-base"
          type="text"
          placeholder="Search your products..."
          onKeyDown={handleHighlightedIndex}
        />
        <button
          className={twMerge(!isOpen && 'hidden', 'absolute top-1/2 right-4 -translate-y-1/2 fill-black/40')}
          onClick={() => {
            setSearchTerm('');
            setIsOpen(false);
          }}
        >
          <Cross />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full rounded border border-black/10 bg-white shadow-lg">
          <ScrollArea.Root className="h-[300px] w-full overflow-x-hidden">
            <ScrollArea.Viewport className="size-full rounded">
              {products?.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <div key={product.id}>
                      <Link prefetch={true} href={`/products/${product.slug}`}>
                        <div
                          onMouseEnter={() => setHighlightedIndex(index)}
                          onClick={() => {
                            setSearchTerm(product.name);
                            setIsOpen(false);
                            inputRef.current?.blur();
                          }}
                          className={twMerge(
                            'flex items-center gap-x-2.5 p-2',
                            highlightedIndex === index && 'bg-gray-100'
                          )}
                        >
                          <Image
                            loading="eager"
                            decoding="sync"
                            className={twMerge(
                              'h-10 w-10 rounded',
                              product.images[0]?.src ? '' : 'border border-black/10'
                            )}
                            width={40}
                            height={40}
                            src={product.images[0]?.src ?? '/woocommerce-placeholder.png'}
                            alt={product.name}
                          />
                          <span className="text-sm text-black">{product.name}</span>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : isLoading ? (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-sm text-gray-500">Loading...</p>
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-sm text-gray-500">No results found</p>
                </div>
              )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex touch-none bg-black/10 p-0.5 transition-colors duration-[160ms] ease-out select-none hover:bg-black/50 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-black before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-black/30" />
          </ScrollArea.Root>
        </div>
      )}
    </div>
  );
}
