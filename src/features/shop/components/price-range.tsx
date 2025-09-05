import { apiFetchWithoutAuth } from '@/lib/app-fetch';
import { type PriceRange } from '@/types';
import { PriceRangeSlider } from './price-range-slider';

export async function PriceRangeFilter() {
  const response = await apiFetchWithoutAuth('/wc/store/v1/products/collection-data?calculate_price_range=true');

  if (!response.ok) {
    return null;
  }

  const data: { price_range: PriceRange } = await response.json();

  return <PriceRangeSlider priceRange={data.price_range} />;
}
