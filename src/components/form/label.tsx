import { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function FormLabel({ className, children, ...rest }: FormLabelProps) {
  return (
    <label
      {...rest}
      className={twMerge('cursor-pointer font-satoshi-medium text-base font-medium text-black', className)}
    >
      {children}
    </label>
  );
}
