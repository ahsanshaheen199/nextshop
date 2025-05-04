import type { Metadata } from 'next';
import '../assets/css/globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header/header';
import { QueryProvider } from '@/components/QueryProvier';

export const metadata: Metadata = {
  title: {
    default: 'NextShop',
    template: '%s | NextShop',
  },
  description: 'eCommerce store built with Next.js, Vercel, WordPress, WooCommerce, and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
