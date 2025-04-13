import { Product } from '@/features/product/types';

export function formatPrice(amount: string, currencySettings: Product['prices']) {
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
