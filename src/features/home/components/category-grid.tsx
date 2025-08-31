import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import Link from 'next/link';
import { Category } from '@/types';

export async function CategoryGrid() {
  const response = await apiFetchWithoutAuth('/wc/store/v1/products/categories?hide_empty=false&per_page=4');

  if (!response.ok) {
    return null;
  }

  const categories = (await response.json()) as Category[];

  return (
    <div>
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-start-1 col-end-13 mb-4 lg:col-start-1 lg:col-end-5 lg:mb-5">
          <Link
            href={`/categories/${categories[0].slug}`}
            className="block h-[190px] w-full rounded-2.5xl bg-white bg-cover bg-center bg-no-repeat px-6 py-4 lg:h-[290px] lg:px-9 lg:py-6"
            style={categories[0].image?.src ? { backgroundImage: `url(${categories[0].image.src})` } : {}}
          >
            <h3 className="font-satoshi-bold text-2xl leading-none lg:text-4xl">{categories[0].name}</h3>
          </Link>
        </div>
        {categories[1] && (
          <div className="col-start-1 col-end-13 mb-4 lg:col-start-5 lg:col-end-13 lg:mb-5">
            <Link
              href={`/categories/${categories[1].slug}`}
              className="block h-[190px] w-full rounded-2.5xl bg-white bg-cover bg-center bg-no-repeat px-6 py-4 lg:h-[290px] lg:px-9 lg:py-6"
              style={categories[1].image?.src ? { backgroundImage: `url(${categories[1].image.src})` } : {}}
            >
              <h3 className="font-satoshi-bold text-2xl leading-none lg:text-4xl">{categories[1].name}</h3>
            </Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 gap-x-5">
        {categories[2] && (
          <div className="col-start-1 col-end-13 mb-4 lg:col-start-1 lg:col-end-9 lg:mb-5">
            <Link
              href={`/categories/${categories[2].slug}`}
              className="block h-[190px] w-full rounded-2.5xl bg-white bg-cover bg-center bg-no-repeat px-6 py-4 lg:h-[290px] lg:px-9 lg:py-6"
              style={categories[2].image?.src ? { backgroundImage: `url(${categories[2].image.src})` } : {}}
            >
              <h3 className="font-satoshi-bold text-2xl leading-none lg:text-4xl">{categories[2].name}</h3>
            </Link>
          </div>
        )}
        {categories[3] && (
          <div className="col-start-1 col-end-13 mb-4 lg:col-start-9 lg:col-end-13 lg:mb-5">
            <Link
              href={`/categories/${categories[3].slug}`}
              className="block h-[190px] w-full rounded-2.5xl bg-white bg-cover bg-center bg-no-repeat px-6 py-4 lg:h-[290px] lg:px-9 lg:py-6"
              style={categories[3].image?.src ? { backgroundImage: `url(${categories[3].image.src})` } : {}}
            >
              <h3 className="font-satoshi-bold text-2xl leading-none lg:text-4xl">{categories[3].name}</h3>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
