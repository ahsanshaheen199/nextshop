import { Button } from '@/components/form/button';
import Image from 'next/image';

export function HeroArea() {
  return (
    <div className="bg-[#F2F0F1] pt-11 lg:pt-26">
      <div className="container mx-auto">
        <div className="relative grid grid-cols-12 gap-x-5">
          <div className="col-span-12 xl:col-span-6">
            <h1 className="mb-5 font-integral-bold text-4xl font-bold lg:mb-6 lg:text-6xl lg:leading-[64px]">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="mb-6 font-satoshi text-sm text-black/60 lg:mb-8 lg:text-base lg:leading-[22px]">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your
              individuality and cater to your sense of style.
            </p>
            <Button isLink href="/shop" className="w-full md:w-auto">
              Shop Now
            </Button>
            <div className="mt-5 flex flex-wrap justify-center gap-y-4 pb-11 md:gap-y-0 lg:mt-12 lg:justify-start lg:pb-29">
              <div className="mr-7 flex flex-col gap-x-4 border-r border-black/10 pr-7 md:mr-8 md:pr-8 lg:gap-x-5">
                <span className="font-satoshi-bold text-4xl">200+</span>
                <p className="text-base text-black/60">International Brands</p>
              </div>
              <div className="flex flex-col gap-x-4 md:mr-8 md:border-r md:border-black/10 md:pr-8 lg:gap-x-5">
                <span className="font-satoshi-bold text-4xl">2000+</span>
                <p className="text-base text-black/60">High Quality Products</p>
              </div>
              <div className="flex flex-col gap-x-4 lg:gap-x-5">
                <span className="font-satoshi-bold text-4xl">30000+</span>
                <p className="text-base text-black/60">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative col-span-12 hidden min-h-[448px] bg-[url('/hero.png')] bg-cover bg-top bg-no-repeat md:min-h-[428px] md:px-4 lg:block xl:col-span-6 xl:bg-[center_top_-1.6rem]">
            <Image
              priority
              src="/hero-big-star.svg"
              height={104}
              width={104}
              alt="big star"
              className="lg:max-h-max-w-24 absolute top-12 right-7 max-h-[76px] max-w-[76px] animate-[spin_4s_infinite] lg:max-w-24 xl:right-0 xl:max-h-[104px] xl:max-w-[104px]"
            />
            <Image
              priority
              src="/hero-small-star.svg"
              height={56}
              width={56}
              alt="small star"
              className="absolute top-36 left-7 max-h-11 max-w-11 animate-[spin_3s_infinite] sm:top-64 md:top-44 md:left-0 md:max-h-14 md:max-w-14 lg:top-56"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
