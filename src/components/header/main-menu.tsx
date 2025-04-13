import { apiFetch } from '@/lib/app-fetch';
import parse, { HTMLReactParserOptions, domToReact, DOMNode } from 'html-react-parser';
import Link from 'next/link';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Menu } from '@/types';

export async function MainMenu() {
  const response = await apiFetch('/wp/v2/navigation', { next: { revalidate: 60 * 5 } });
  const menus = (await response.json()) as Menu[];
  const publishedMenus = menus.filter((menu) => menu.status === 'publish');
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
          <>
            <Link href={href.replace(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}`, '')} className={className}>
              {domToReact(children as DOMNode[], options)}
            </Link>
          </>
        );
      }
    },
  };

  if (!headerMenu) {
    return <p className="ms-10 py-9 text-base text-black">No menu found</p>;
  }

  return (
    <nav className="ms-7 hidden items-center lg:flex">
      <ul className="main-menu flex items-center text-base">{parse(headerMenu.content.rendered, options)}</ul>
    </nav>
  );
}
