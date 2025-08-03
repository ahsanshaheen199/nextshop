import { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function FormLabel({ className, children, ...rest }: FormLabelProps) {
  return (
    <label
      {...rest}
      className={twMerge(
        "font-medium text-base text-black font-satoshi-medium cursor-pointer",
        className
      )}
    >
      {children}
    </label>
  );
}
