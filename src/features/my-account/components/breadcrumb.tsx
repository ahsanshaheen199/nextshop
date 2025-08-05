'use client';

import { Breadcrumb } from '@/components/breadcrumb';
import { usePathname } from 'next/navigation';

export function MyAccountBreadcrumb() {
  const location = usePathname();

  const links = [
    { title: 'Home', href: '/' },
    { title: 'My Account', href: location === '/my-account' ? '#' : '/my-account' },
  ];

  if (location === '/my-account/downloads') {
    links.push({ title: 'Downloads', href: '#' });
  }

  if (location === '/my-account/orders') {
    links.push({ title: 'Orders', href: '#' });
  }

  if (location === '/my-account/edit-address') {
    links.push({ title: 'Addresses', href: '#' });
  }

  if (location === '/my-account/edit-account') {
    links.push({ title: 'Account Details', href: '#' });
  }

  return <Breadcrumb links={links} />;
}
