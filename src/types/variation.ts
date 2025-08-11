export type StockStatus = 'instock' | 'outofstock' | 'onbackorder';

export interface ProductVariationDimensions {
  length: string;
  width: string;
  height: string;
}

export interface ProductVariationImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductVariationAttribute {
  id?: number;
  name: string;
  option: string;
}

export interface ProductVariationMetaData {
  id: number;
  key: string;
  value: unknown;
}

// Based on WooCommerce REST API v3 Product Variation properties
// Reference: https://woocommerce.github.io/woocommerce-rest-api-docs/#product-variation-properties
export interface ProductVariation {
  id: number;
  parent_id?: number;
  date_created?: string;
  date_modified?: string;
  description?: string;
  permalink?: string;
  sku?: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale?: boolean;
  stock_status: StockStatus;
  stock_quantity: number | null;
  manage_stock?: boolean;
  backorders?: 'no' | 'notify' | 'yes';
  weight?: string;
  dimensions?: ProductVariationDimensions;
  image?: ProductVariationImage;
  attributes: ProductVariationAttribute[];
  tax_class?: string;
  shipping_class?: string;
  shipping_class_id?: number;
  menu_order?: number;
  meta_data?: ProductVariationMetaData[];
}
