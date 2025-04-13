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
};
