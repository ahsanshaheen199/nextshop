import { Image } from '@/features/product/types';

export type Menu = {
  id: number;
  slug: string;
  status: 'publish' | 'draft';
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export type SiteSettings = {
  title: string;
};

export type Params<T> = Promise<T>;

export type SearchParams = { [key: string]: string | string[] | undefined };

export type ProductReview = {
  formatted_date_created: string;
  id: number;
  product_id: number;
  product_image: Image | null;
  product_name: string;
  rating: number;
  review: string;
  reviewer: string;
  verified: false;
};
