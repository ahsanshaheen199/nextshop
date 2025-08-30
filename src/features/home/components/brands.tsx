import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { Brand } from '@/types';
import Image from 'next/image';

export async function Brands() {
  const response = await apiFetchWithoutAuth('/wc/store/v1/products/brands?per_page=5&hide_empty=false');

  if (!response.ok) {
    return null;
  }

  const brands = (await response.json()) as Brand[];

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 bg-black py-11 lg:mb-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-5 lg:justify-between lg:gap-y-0">
          {brands.map((brand) => (
            <div className="relative h-6 w-28 lg:h-9 lg:w-48" key={brand.id}>
              <Image
                fill
                className="object-contain"
                key={brand.id}
                src={brand.image.src}
                alt={brand.name}
                sizes="(min-width: 1024px) 12rem, 7rem"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
