import { CategoryTree } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

export function CategoryItem({ cat }: { cat: CategoryTree }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <p className="flex items-center justify-between hover:text-black">
        <Link href={`/categories/${cat.slug}`}>{cat.name}</Link>
        {cat.children?.length > 0 && (
          <button
            className="cursor-pointer p-1"
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            <svg
              className={`transition-transform duration-250 ease-linear ${open ? 'rotate-90' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z"
                fill="black"
                fillOpacity="0.6"
              />
            </svg>
          </button>
        )}
      </p>
      {cat.children?.length > 0 && (
        <div
          className={`${open ? 'grid-rows-[1fr] pt-3 pl-3 opacity-100' : 'mt-0 grid-rows-[0fr] pt-0 pl-0 opacity-0'} grid transition-[grid-template-rows,opacity,padding] duration-250 ease-linear`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-3">
              {cat.children?.map((c) => {
                return (
                  <li key={c.id}>
                    <Link className="hover:text-black" href={`/categories/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}
