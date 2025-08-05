import { LogoutLink } from '@/features/my-account/components/logout-link';
import { NavLink } from '@/features/my-account/components/nav-link';
import { MyAccountBreadcrumb } from '@/features/my-account/components/breadcrumb';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const navLinks = [
    {
      href: '/my-account',
      label: 'Dashboard',
    },
    {
      href: '/my-account/orders',
      label: 'Orders',
    },
    {
      href: '/my-account/downloads',
      label: 'Downloads',
    },
    {
      href: '/my-account/edit-address',
      label: 'Addresses',
    },
    {
      href: '/my-account/edit-account',
      label: 'Account Details',
    },
  ];

  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <MyAccountBreadcrumb />
        </div>

        <div className="pb-20 lg:flex lg:gap-10">
          <div className="w-full lg:w-4/5">{children}</div>
          <div className="w-full lg:w-1/5">
            <nav>
              <ul className="flex flex-col divide-y divide-black/10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </li>
                ))}

                <li>
                  <LogoutLink />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
