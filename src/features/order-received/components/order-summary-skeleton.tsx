export function OrderSummarySkeleton() {
  return (
    <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i}>
          <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}
