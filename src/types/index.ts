import { Image, Product } from '@/features/product/types';

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

export type Cart = {
  items: CartItem[];
  coupons: []; // Replace 'any' with a more specific type if you know the structure of coupons
  fees: []; // Replace 'any' with a more specific type if you know the structure of fees
  totals: {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string | null;
    total_shipping_tax: string | null;
    total_price: string;
    total_tax: string;
    tax_lines: []; // Replace 'any' with a more specific type if you know the structure of tax lines
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  needs_payment: boolean;
  needs_shipping: boolean;
  payment_requirements: string[];
  has_calculated_shipping: boolean;
  shipping_rates: []; // Replace 'any' with a more specific type if you know the structure of shipping rates
  items_count: number;
  items_weight: number;
  cross_sells: []; // Replace 'any' with a more specific type if you know the structure of cross sells
  errors: []; // Replace 'any' with a more specific type if you know the structure of errors
  payment_methods: []; // Replace 'any' with a more specific type if you know the structure of payment methods
  extensions: Record<string, unknown>;
};

export type CartItem = {
  key: string;
  id: number;
  type: string;
  quantity: number;
  quantity_limits: {
    minimum: number;
    maximum: number;
    multiple_of: number;
  };
  name: string;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge?: boolean;
  sold_individually: boolean;
  images: Product['images']; // Replace 'any' with a proper image interface if you know the structure
  variation?: {
    attribute: string;
    value: string;
  }[]; // Replace 'any' with a proper variation interface if you know the structure
  item_data?: []; // Replace 'any' with a proper item data interface if you know the structure
  prices?: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: 2;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: {
      precision: number;
      price: string;
      regular_price: string;
      sale_price: string;
    };
  };
  totals?: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: 2;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  catalog_visibility?: string;
  extensions?: Record<string, unknown>;
};

export type ShippingRate = {
  package_id: number;
  name: string;
  destination: {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  items: Array<{
    key: string;
    name: string;
    quantity: number;
  }>;
  shipping_rates: Array<{
    rate_id: string;
    name: string;
    description: string;
    delivery_time: string;
    price: string;
    taxes: string;
    instance_id: number;
    method_id: string;
    meta_data: Array<{
      key: string;
      value: string;
    }>;
    selected: boolean;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  }>;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: {
    src: string;
    alt: string;
    thumbnail: string;
  };
};

export type Brand = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: {
    src: string;
    alt: string;
    thumbnail: string;
  };
};

export type CategoryTree = Category & {
  children: Category[];
};

export type PriceRange = {
  min_price: string;
  max_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
};
