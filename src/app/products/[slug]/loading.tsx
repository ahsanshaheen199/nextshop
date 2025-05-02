import { ChevronRight } from '@/components/icons/chevron-right';
import { BreadcrumbSkeleton } from '@/components/skeleton/breadcrumb-skeleton';
import { TabsSkeleton } from '@/features/single-product/components/tabs-skeleton';

export default function Loading() {
  return (
    <main>
      <div className="container">
        <div className="border-t border-black/10 pt-6 pb-9">
          <BreadcrumbSkeleton />
        </div>
        <TabsSkeleton />
      </div>
    </main>
  );
}
