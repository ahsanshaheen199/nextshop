"use client";

import Link from "next/link";
import { UserIcon } from "../icons/user";
import { CartIcon } from "../icons/cart";
import { SearchIcon } from "../icons/search";
import { AlignIcon } from "../icons/align";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross } from "../icons/cross";

export const HeaderMain = () => {
  return (
    <div className="py-6">
      {/* <form className="absolute w-80 p-5 shadow rounded right-0 top-full">
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
          <input
            className="bg-[#F0F0F0] w-full placeholder:text-black/40 rounded-full text-sm lg:text-base lg:pl-[52px] pl-12 py-3 pr-4 text-black outline-none"
            type="search"
            placeholder="Search your products..."
          />
        </div>
      </form> */}
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button className="inline-block lg:hidden me-4 mt-1">
              <AlignIcon className="fill-black" />
            </button>
            <h1 className="font-integral-bold text-black text-3xl leading-[1] -mt-0.5">
              <Link href="/">NextShop</Link>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="items-center ms-10 hidden lg:flex">
            <ul className="flex items-center text-black text-base gap-x-6">
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/shop">On Sale</Link>
              </li>
              <li>
                <Link href="/shop">New Arrivals</Link>
              </li>
              <li>
                <Link href="/shop">Brands</Link>
              </li>
            </ul>
          </nav>

          {/* Product Search */}
          <div className="flex-1 ms-10 hidden lg:block">
            <form>
              <div className="relative">
                <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
                <input
                  className="bg-[#F0F0F0] w-full placeholder:text-black/40 rounded-full text-sm lg:text-base lg:pl-[52px] pl-12 py-3 pr-4 text-black outline-none"
                  type="search"
                  placeholder="Search your products..."
                />
              </div>
            </form>
          </div>

          {/* User & Cart Icon */}
          <div className="flex items-center ms-10 gap-x-[14px]">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="inline-block lg:hidden">
                  <SearchIcon className="fill-black" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed left-0 top-0 w-full bg-white pb-10 pt-12 px-4 data-[state=open]:animate-overlayShow">
                  <Dialog.Title></Dialog.Title>
                  <form className="">
                    <div className="relative">
                      <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
                      <input
                        className="bg-[#F0F0F0] w-full placeholder:text-black/40 rounded-full text-sm lg:text-base lg:pl-[52px] pl-12 py-3 pr-4 text-black outline-none"
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
              <span className="absolute -right-2.5 -top-2.5 text-sm w-5 h-5 inline-flex items-center justify-center rounded-full bg-black text-white">
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
