import * as Dialog from '@radix-ui/react-dialog';
import { AlignIcon } from '@/components/icons/align';
import { Cross } from '@/components/icons/cross';
import Link from 'next/link';
import { apiFetch } from '@/lib/app-fetch';
import { Menu, SiteSettings } from '@/types';
import parse, { DOMNode, domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { ChevronDown } from '@/components/icons/chevron-down';
import { MainMenuScript } from '@/components/header/main-menu-script';

export async function Logo() {
  const response = await apiFetch('/wp/v2/settings', { next: { revalidate: 60 * 5 } });
  const result = (await response.json()) as SiteSettings;

  const navigationResponse = await apiFetch('/wp/v2/navigation', { next: { revalidate: 60 * 5 } });
  const navigationResult = (await navigationResponse.json()) as Menu[];
  const publishedMenus = navigationResult.filter((menu) => menu.status === 'publish');
  const headerMenu = publishedMenus.find((menu) => menu.slug === 'main-menu');

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'li') {
        const { attribs, children } = domNode;
        const className = attribs.class;

        return (
          <li className={className}>
            {domToReact(children as DOMNode[], options)}
            {className.includes('has-child') && (
              <span className="submenu-icon">
                <ChevronDown />
              </span>
            )}
          </li>
        );
      }
      if (domNode.type === 'tag' && domNode.name === 'a') {
        const { attribs, children } = domNode;
        const href = attribs.href || '#';
        const className = attribs.class;

        return (
          <Link href={href.replace(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}`, '')} className={className}>
            {domToReact(children as DOMNode[], options)}
          </Link>
        );
      }
    },
  };

  return (
    <div className="flex items-center">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="me-4 mt-1 inline-block lg:hidden">
            <AlignIcon className="fill-black" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed top-0 left-0 z-50 h-full w-3/4 bg-white shadow-lg transition data-[state=closed]:-translate-x-full data-[state=closed]:animate-slide-out-from-right data-[state=closed]:duration-300 data-[state=open]:animate-slide-in-from-right data-[state=open]:duration-500 sm:max-w-sm">
            <Dialog.Title className="mt-0.5 p-5 font-integral-bold text-3xl leading-[1] text-black">
              {result.title}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 text-black">
                <Cross />
              </button>
            </Dialog.Close>

            {headerMenu ? (
              <ul className="mobile-menu flex flex-col px-3 text-base">
                {parse(headerMenu.content.rendered, options)}
              </ul>
            ) : null}
            <MainMenuScript />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <h1 className="-mt-0.5 font-integral-bold text-3xl leading-[1] text-black">
        <Link href="/">{result.title}</Link>
      </h1>
    </div>
  );
}
