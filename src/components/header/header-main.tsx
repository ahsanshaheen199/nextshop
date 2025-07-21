import Link from 'next/link';
import { UserIcon } from '../icons/user';
import { SearchIcon } from '../icons/search';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross } from '../icons/cross';
import { MainMenu } from '@/components/header/main-menu';
import { Suspense } from 'react';
import { Logo } from '@/components/header/logo';
import { MiniCartBtn } from './mini-cart-btn';
import { ProductSearch } from './product-search';

export const HeaderMain = () => {
  return (
    <div className="py-6 lg:py-0">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Suspense fallback={<div className="h-[30px] w-[180px] animate-pulse rounded bg-gray-200"></div>}>
            <Logo />
          </Suspense>

          {/* Navigation */}
          <Suspense
            fallback={
              <div className="ms-10 hidden items-center gap-x-4 py-9 lg:flex">
                <div className="h-5 w-14 animate-pulse rounded bg-gray-200"></div>
                <div className="h-5 w-14 animate-pulse rounded bg-gray-200"></div>
                <div className="h-5 w-14 animate-pulse rounded bg-gray-200"></div>
                <div className="h-5 w-14 animate-pulse rounded bg-gray-200"></div>
              </div>
            }
          >
            <MainMenu />
          </Suspense>

          {/* Product Search */}
          <div className="ms-10 hidden flex-1 bg-amber-50 lg:block">
            <ProductSearch />
          </div>

          {/* User & Cart Icon */}
          <div className="ms-10 flex items-center gap-x-[14px]">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="inline-block lg:hidden">
                  <SearchIcon className="fill-black" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed top-0 left-0 z-50 size-full w-full bg-white pt-12 data-[state=open]:animate-overlayShow">
                  <div className="size-full">
                    <div className="mx-auto w-[80%]">
                      <Dialog.Title></Dialog.Title>
                      <ProductSearch />
                    </div>
                  </div>

                  <Dialog.Close asChild>
                    <button className="absolute top-4 right-4 text-black">
                      <Cross />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <MiniCartBtn />
            <Link className="text-black" href="/my-account">
              <UserIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
