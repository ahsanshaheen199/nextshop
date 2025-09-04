import * as Accordion from '@radix-ui/react-accordion';

export function SingleAttributeSkeleton() {
  return (
    <Accordion.Item value="single-attribute-skeleton" className="py-5">
      <Accordion.Header>
        <div className="flex w-full items-center justify-between">
          <div className="h-7 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
        </div>
      </Accordion.Header>

      <div className="space-y-2 pt-3">
        <div className="h-5 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200"></div>
        <div className="h-5 w-4/6 animate-pulse rounded bg-gray-200"></div>
      </div>
    </Accordion.Item>
  );
}
