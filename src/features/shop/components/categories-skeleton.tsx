export function CategoriesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-3 h-7 w-32 rounded bg-gray-200"></div>
      <div className="space-y-2">
        <div className="h-5 w-full rounded bg-gray-200"></div>
        <div className="h-5 w-5/6 rounded bg-gray-200"></div>
        <div className="h-5 w-4/6 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
