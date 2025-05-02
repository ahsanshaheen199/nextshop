import { ChevronRight } from '@/components/icons/chevron-right';

export function BreadcrumbSkeleton() {
  return (
    <div className="flex gap-x-3">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="inline-flex items-center gap-x-1">
          <div className="h-6 w-12 animate-pulse rounded bg-gray-200"></div>
          <span className="mt-0.5 inline-block">
            <ChevronRight />
          </span>
        </div>
      ))}
    </div>
  );
}
