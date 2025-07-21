import type { Metadata } from 'next';
import '../assets/css/globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header/header';
import { CartProvider } from '@/providers/cart-provider';
import { getCart } from '@/features/cart/queries';
import { QueryProvider } from '@/providers/query-provider';

export const metadata: Metadata = {
  title: {
    default: 'NextShop',
    template: '%s | NextShop',
  },
  description: 'eCommerce store built with Next.js, Vercel, WordPress, WooCommerce, and Tailwind CSS.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = await getCart();

  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <CartProvider cart={cart}>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
