export interface OrderBilling {
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
}

export interface OrderShipping {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface OrderLineItemTax {
  id: number;
  total: string;
  subtotal: string;
}

export interface OrderLineItemMeta {
  id: number;
  key: string;
  value: string;
}

export interface OrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: OrderLineItemTax[];
  meta_data: OrderLineItemMeta[];
  sku: string;
  price: number;
  image: {
    id: number;
    src: string;
  };
  parent_name?: string;
}

export interface OrderShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: OrderLineItemTax[];
  meta_data: OrderLineItemMeta[];
}

export interface OrderTaxLine {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  rate_percent: number;
  meta_data: OrderLineItemMeta[];
}

export interface OrderFeeLine {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  total: string;
  total_tax: string;
  taxes: OrderLineItemTax[];
  meta_data: OrderLineItemMeta[];
}

export interface OrderCouponLine {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: OrderLineItemMeta[];
}

export interface OrderRefund {
  id: number;
  reason: string;
  total: string;
}

export interface Order {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed' | 'trash';
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: OrderBilling;
  shipping: OrderShipping;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string | null;
  date_paid_gmt: string | null;
  date_completed: string | null;
  date_completed_gmt: string | null;
  cart_hash: string;
  meta_data: OrderLineItemMeta[];
  line_items: OrderLineItem[];
  tax_lines: OrderTaxLine[];
  shipping_lines: OrderShippingLine[];
  fee_lines: OrderFeeLine[];
  coupon_lines: OrderCouponLine[];
  refunds: OrderRefund[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  currency_symbol: string;
}

export type OrderStatus = Order['status'];

// For API responses that include pagination info
export interface OrdersResponse {
  orders: Order[];
  total: number;
  totalPages: number;
}
