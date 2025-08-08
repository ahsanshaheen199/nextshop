'use client';

import { useCallback, useMemo, useState } from 'react';

type StarRatingInputProps = {
  value: number; // current selected rating (0..max)
  onChange: (nextValue: number) => void; // called with 0..max
  max?: number; // total number of stars (default 5)
  allowClear?: boolean; // clicking the same value clears to 0
  disabled?: boolean;
  className?: string;
  starClassName?: string; // classes for each star svg
  size?: number; // px width, maintains original aspect ratio (24x23)
  fullColor?: string; // fill color for active stars
  emptyColor?: string; // fill color for inactive stars
  'aria-label'?: string;
};

// Reusable star SVG path from display Rating component (kept identical for visual consistency)
function StarIcon({
  filled,
  size = 24,
  color = '#FFC633',
  emptyColor = '#E5E7EB',
  className,
}: {
  filled: boolean;
  size?: number;
  color?: string;
  emptyColor?: string;
  className?: string;
}) {
  // Keep aspect ratio consistent with original 24x23 viewBox
  const width = size;
  const height = Math.round((23 / 24) * size);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11.7925 0L15.2932 7.53796L23.544 8.53794L17.4567 14.1966L19.0553 22.3526L11.7925 18.3119L4.52969 22.3526L6.12829 14.1966L0.0410357 8.53794L8.29182 7.53796L11.7925 0Z"
        fill={filled ? color : emptyColor}
      />
    </svg>
  );
}

export function StarRatingInput({
  value,
  onChange,
  max = 5,
  allowClear = true,
  disabled = false,
  className,
  starClassName,
  size = 24,
  fullColor = '#FFC633',
  emptyColor = '#E5E7EB',
  'aria-label': ariaLabel = 'Star rating',
}: StarRatingInputProps) {
  const safeMax = useMemo(() => (Number.isFinite(max) && max > 0 ? Math.floor(max) : 5), [max]);
  const clampedValue = useMemo(() => {
    if (!Number.isFinite(value)) return 0;
    return Math.min(Math.max(Math.floor(value), 0), safeMax);
  }, [value, safeMax]);

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const currentDisplayValue = hoveredValue ?? clampedValue;

  const handleClick = useCallback(
    (index: number) => {
      if (disabled) return;
      const next = index + 1; // stars are 1-based to the user
      if (allowClear && clampedValue === next) {
        onChange(0);
      } else {
        onChange(next);
      }
    },
    [allowClear, clampedValue, disabled, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        onChange(Math.min(clampedValue + 1, safeMax));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        onChange(Math.max(clampedValue - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        onChange(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        onChange(safeMax);
      } else if (e.key === 'Enter' || e.key === ' ') {
        // noop; selection happens on each star button
      }
    },
    [clampedValue, disabled, onChange, safeMax]
  );

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={`flex items-center gap-x-1 ${className ?? ''}`}
      onMouseLeave={() => setHoveredValue(null)}
    >
      {Array.from({ length: safeMax }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = currentDisplayValue >= starValue;
        const checked = clampedValue === starValue;
        return (
          <button
            key={index}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={`${starValue} ${starValue === 1 ? 'star' : 'stars'}`}
            disabled={disabled}
            className="cursor-pointer p-0 outline-none disabled:cursor-not-allowed"
            onMouseEnter={() => setHoveredValue(starValue)}
            onFocus={() => setHoveredValue(starValue)}
            onBlur={() => setHoveredValue(null)}
            onClick={() => handleClick(index)}
          >
            <StarIcon
              filled={isFilled}
              size={size}
              color={fullColor}
              emptyColor={emptyColor}
              className={starClassName}
            />
          </button>
        );
      })}
    </div>
  );
}

export default StarRatingInput;
