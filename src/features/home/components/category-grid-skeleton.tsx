export function CategoryGridSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-start-1 col-end-13 mb-4 lg:col-start-1 lg:col-end-5 lg:mb-5">
          <div className="h-[190px] w-full animate-pulse rounded-2.5xl bg-gray-200 lg:h-[290px]" />
        </div>
        <div className="col-start-1 col-end-13 mb-4 lg:col-start-5 lg:col-end-13 lg:mb-5">
          <div className="h-[190px] w-full animate-pulse rounded-2.5xl bg-gray-200 lg:h-[290px]" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-start-1 col-end-13 mb-4 lg:col-start-1 lg:col-end-9 lg:mb-5">
          <div className="h-[190px] w-full animate-pulse rounded-2.5xl bg-gray-200 lg:h-[290px]" />
        </div>
        <div className="col-start-1 col-end-13 mb-4 lg:col-start-9 lg:col-end-13 lg:mb-5">
          <div className="h-[190px] w-full animate-pulse rounded-2.5xl bg-gray-200 lg:h-[290px]" />
        </div>
      </div>
    </div>
  );
}
