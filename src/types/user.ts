import { OrderBilling, OrderShipping } from './order';

export type User = {
  id: number;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  roles: string[];
  nickname: string;
};

export type Customer = {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  is_paying_customer: boolean;
  avatar_url: string;
  billing: OrderBilling;
  shipping: OrderShipping;
};
