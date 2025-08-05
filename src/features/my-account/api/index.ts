import { apiFetch } from '@/lib/app-fetch';
import { Download } from '@/types/download';

export async function getDownloads(id: number) {
  const response = await apiFetch(`/wc/v3/customers/${id}/downloads`);
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as Download[];
  return data;
}
