'use client';

import { twMerge } from 'tailwind-merge';

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onValueChange: (value: number) => void;
  className?: string;
  iconClassName?: string;
};

export function Quantity({
  value,
  onIncrement,
  onDecrement,
  onValueChange,
  className,
  iconClassName = 'w-6 h-6',
}: Props) {
  return (
    <div
      className={twMerge(
        'inline-flex max-w-[170px] flex-none items-center rounded-full bg-[#F0F0F0] px-5 py-3.5',
        className
      )}
    >
      <button onClick={() => onDecrement()} type="button" className="w-auto cursor-pointer">
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
            fill="black"
          />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        className="w-full grow-1 border-0 bg-transparent px-2 py-0 text-center font-satoshi-medium text-base font-medium text-black shadow-none ring-0 focus:border-0 focus:outline-none"
        min="1"
        step={1}
        onChange={(event) => onValueChange(event.target.valueAsNumber)}
      />
      <button onClick={() => onIncrement()} className="w-auto cursor-pointer" type="button">
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
}
