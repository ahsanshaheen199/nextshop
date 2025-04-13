import Link from 'next/link';
import { UserIcon } from '../icons/user';
import { CartIcon } from '../icons/cart';
import { SearchIcon } from '../icons/search';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross } from '../icons/cross';
import { MainMenu } from '@/components/header/main-menu';
import { Suspense } from 'react';
import { Logo } from '@/components/header/logo';

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
            <form>
              <div className="relative">
                <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
                <input
                  className="w-full rounded-full bg-[#F0F0F0] py-3 pr-4 pl-12 text-sm text-black outline-none placeholder:text-black/40 lg:pl-[52px] lg:text-base"
                  type="search"
                  placeholder="Search your products..."
                />
              </div>
            </form>
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
                <Dialog.Content className="fixed top-0 left-0 z-50 w-full bg-white px-4 pt-12 pb-10 data-[state=open]:animate-overlayShow">
                  <Dialog.Title></Dialog.Title>
                  <form className="">
                    <div className="relative">
                      <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
                      <input
                        className="w-full rounded-full bg-[#F0F0F0] py-3 pr-4 pl-12 text-sm text-black outline-none placeholder:text-black/40 lg:pl-[52px] lg:text-base"
                        type="search"
                        placeholder="Search your products..."
                      />
                    </div>
                  </form>
                  <Dialog.Close asChild>
                    <button className="absolute top-4 right-4 text-black">
                      <Cross />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <button className="relative">
              <CartIcon />
              <span className="absolute -top-2.5 -right-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
                0
              </span>
            </button>
            <Link className="text-black" href="/my-account">
              <UserIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
