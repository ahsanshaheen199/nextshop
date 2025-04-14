export const Rating = ({
  averageRating,
  fullStarClassName,
  halfStarClassName,
  className,
}: {
  averageRating: number;
  fullStarClassName?: string;
  halfStarClassName?: string;
  className?: string;
}) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.min(Math.max(averageRating, 0), 5);
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-x-1 ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg
          className={fullStarClassName}
          key={`full-${i}`}
          width="24"
          height="23"
          viewBox="0 0 24 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7925 0L15.2932 7.53796L23.544 8.53794L17.4567 14.1966L19.0553 22.3526L11.7925 18.3119L4.52969 22.3526L6.12829 14.1966L0.0410357 8.53794L8.29182 7.53796L11.7925 0Z"
            fill="#FFC633"
          />
        </svg>
      ))}

      {/* Half Star (if needed) */}
      {hasHalfStar && (
        <svg
          className={halfStarClassName}
          width="12"
          height="23"
          viewBox="0 0 12 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.73719 22.3526L12 18.3119V0L8.49932 7.53796L0.248535 8.53793L6.33579 14.1966L4.73719 22.3526Z"
            fill="#FFC633"
          />
        </svg>
      )}
    </div>
  );
};
