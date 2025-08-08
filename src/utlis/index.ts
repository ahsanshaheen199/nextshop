import { Product } from '@/features/product/types';

export function formatPrice(
  amount: string,
  currencySettings: {
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  }
) {
  const {
    currency_minor_unit,
    currency_decimal_separator,
    currency_thousand_separator,
    currency_prefix,
    currency_suffix,
  } = currencySettings;

  if (isNaN(Number(amount))) return '';

  // Convert to proper decimal places
  const numericAmount = (Number(amount) / Math.pow(10, currency_minor_unit)).toFixed(currency_minor_unit);

  // Add thousand separators
  const parts = numericAmount.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, currency_thousand_separator);

  const formatted = parts.join(currency_decimal_separator);

  return `${currency_prefix}${formatted}${currency_suffix}`;
}

export function calculateDiscountPercentage(currencySettings: Product['prices']) {
  const { regular_price, sale_price, currency_minor_unit } = currencySettings;
  const regularPrice = Number(regular_price) / Math.pow(10, currency_minor_unit);
  const salePrice = Number(sale_price) / Math.pow(10, currency_minor_unit);
  if (regularPrice <= 0 || salePrice <= 0) return 0; // Avoid division by zero
  const discount = ((regularPrice - salePrice) / regularPrice) * 100;
  return Math.round(discount); // Round to nearest whole number
}

export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim() === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}
