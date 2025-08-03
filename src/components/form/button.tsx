import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        twMerge(
          'inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-7 py-3 font-satoshi-medium text-sm text-white lg:px-10 lg:text-base',
          className
        )
      )}
    >
      {children}
    </button>
  );
}
