import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  isLink?: boolean;
  href?: string;
  onNavigate?: () => void;
};

export function Button({ className, children, isLoading, isLink, href, onNavigate, ...rest }: ButtonProps) {
  if (isLink) {
    return (
      <Link
        className={twMerge(
          twMerge(
            'inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-7 py-3 font-satoshi-medium text-sm text-white hover:bg-black/80 disabled:opacity-50 lg:px-10 lg:text-base',
            className
          )
        )}
        href={href as string}
        onNavigate={onNavigate}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      {...rest}
      className={twMerge(
        twMerge(
          'inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-7 py-3 font-satoshi-medium text-sm text-white hover:bg-black/80 disabled:opacity-50 lg:px-10 lg:text-base',
          isLoading && 'gap-x-2',
          className
        )
      )}
    >
      {isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
