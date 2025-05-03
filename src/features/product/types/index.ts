export type Product = {
  id: number;
  name: string;
  slug: string;
  type: 'simple' | 'variable' | 'external' | 'grouped';
  on_sale: boolean;
  average_rating: string;
  is_in_stock: boolean;
  is_purchasable: boolean;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: {
      min_amount: string;
      max_amount: string;
    } | null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  price_html: string;
  images: Image[];
  categories: Category[];
  short_description: string;
  description: string;
  add_to_cart: {
    text: string;
  };
  extensions: {
    'next-woo-helper-custom-product-data': {
      related_ids: number[];
      dimensions: { length: string; width: string; height: string };
      dimensions_unit: string;
      weight_unit: string;
      weight: string;
    };
  };
  attributes: {
    id: number;
    name: string;
    terms: { id: number; name: string; slug: string }[];
  }[];
  review_count: number;
};

export type Image = {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};
