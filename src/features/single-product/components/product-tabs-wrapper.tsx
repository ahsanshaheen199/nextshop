import { apiFetch } from '@/lib/app-fetch';
import { SingleProductTabs } from './single-product-tabs';
import { verifySession } from '@/dal/session';
import { getProduct } from '../api';

export async function ProductTabsWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await verifySession();
  const settingsResponse = await apiFetch(`/wc/v3/settings/products`);
  const product = await getProduct(slug);

  return (
    <div className="mb-[50px] lg:mb-20">
      <SingleProductTabs
        session={session}
        settingsResult={
          settingsResponse.ok ? ((await settingsResponse.json()) as { id: string; value: string }[]) : undefined
        }
        product={product}
      />
    </div>
  );
}
