import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        twMerge(
          "cursor-pointer rounded-full bg-black text-white lg:text-base text-sm inline-flex justify-center items-center lg:px-10 px-7 py-3 font-satoshi-medium",
          className
        )
      )}
    >
      {children}
    </button>
  );
}
