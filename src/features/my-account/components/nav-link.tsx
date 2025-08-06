'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname === `${href}/billing` || pathname === `${href}/shipping`;

  return (
    <Link
      className={twMerge(
        'block border-l-4 border-transparent px-6 py-4 text-base text-black/60 hover:border-[#EBEBEB] hover:bg-[#F0F0F0]',
        isActive(href) && 'border-black bg-[#F0F0F0] hover:border-black'
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
