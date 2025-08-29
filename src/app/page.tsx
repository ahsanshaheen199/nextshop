import { Suspense } from 'react';
import { BestSelling } from '@/features/home/components/best-selling';
import { CarouselSkeleton } from '@/features/home/components/carousel-skeleton';
import { CategoryGridSkeleton } from '@/features/home/components/category-grid-skeleton';
import { Button } from '@/components/form/button';
import { NewArrivals } from '@/features/home/components/new-arrivals';
import { CategoryGrid } from '@/features/home/components/category-grid';
import { ReviewsCarousel } from '@/features/home/components/reviews-carousel';
import { ReviewsCarouselSkeleton } from '@/features/home/components/reviews-carousel-skeleton';
import { Brands } from '@/features/home/components/brands';
import { BrandsSkeleton } from '@/features/home/components/brands-skeleton';

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<BrandsSkeleton />}>
        <Brands />
      </Suspense>
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
      <div className="container mx-auto">
        <div className="mb-12 rounded-[40px] bg-[#F0F0F0] px-16 py-18 lg:mb-20">
          <h2 className="mb-7 text-center font-integral-bold text-[32px] leading-[36px] text-black lg:mb-16 lg:text-5xl">
            Browse by Category
          </h2>
          <Suspense fallback={<CategoryGridSkeleton />}>
            <CategoryGrid />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<ReviewsCarouselSkeleton />}>
        <ReviewsCarousel />
      </Suspense>
    </main>
  );
}
