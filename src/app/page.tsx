import { Suspense } from 'react';
import { BestSelling } from '@/features/home/components/best-selling';
import { CarouselSkeleton } from '@/features/home/components/carousel-skeleton';
import { Button } from '@/components/form/button';
import { NewArrivals } from '@/features/home/components/new-arrivals';

export default async function Home() {
  return (
    <main>
      <div className="container mx-auto">
        <div className="border-b border-black/10 pb-12 lg:pb-20">
          <h2 className="mb-10 text-center font-integral-bold text-[32px] leading-[36px] text-black lg:mb-14 lg:text-5xl">
            New Arrivals
          </h2>
          <Suspense fallback={<CarouselSkeleton />}>
            <NewArrivals />
          </Suspense>
          <div className="text-center">
            <Button
              isLink
              className="bg-white text-black ring-1 ring-black/10 transition-colors hover:bg-black hover:text-white"
              href="/products"
            >
              View all
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="py-12 lg:py-20">
          <h2 className="mb-10 text-center font-integral-bold text-[32px] leading-[36px] text-black lg:mb-14 lg:text-5xl">
            Top Selling
          </h2>
          <Suspense fallback={<CarouselSkeleton />}>
            <BestSelling />
          </Suspense>
          <div className="text-center">
            <Button
              isLink
              className="bg-white text-black ring-1 ring-black/10 transition-colors hover:bg-black hover:text-white"
              href="/products"
            >
              View all
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
