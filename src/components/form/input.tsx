import { twMerge } from 'tailwind-merge';

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
};

export function FormInput({ type, isError = false, className, ...rest }: FormInputProps) {
  return (
    <input
      {...rest}
      type={type}
      className={twMerge(
        'h-12 rounded-full border-0 px-4 py-3 text-sm text-black shadow-none ring-1 ring-black/10 placeholder:text-black/40 focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F1F1F4] disabled:text-[#A5A5AA] disabled:placeholder:text-[#A5A5AA] lg:text-base',
        isError && 'hasErrors ring-red-500 focus:ring-red-500',
        className
      )}
    />
  );
}
