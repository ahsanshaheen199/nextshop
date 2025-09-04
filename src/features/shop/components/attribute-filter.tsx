import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { Suspense } from 'react';
import { SingleAttribute } from './single-attribute';
import { SingleAttributeSkeleton } from './single-attribute-skeleton';

export async function AttributeFilter() {
  const attributes = await apiFetchWithoutAuth('/wc/store/v1/products/attributes');

  if (!attributes.ok) {
    return null;
  }

  const attributesData = (await attributes.json()) as { id: number; name: string; taxonomy: string }[];

  return attributesData.map((attribute) => {
    return (
      <Suspense key={attribute.id} fallback={<SingleAttributeSkeleton />}>
        <SingleAttribute attribute={attribute} />
      </Suspense>
    );
  });
}
