'use client';

import { CartResponse } from '@/types/cart-response';
import { CartItem } from '@/types/cart';
import { ProductResponseItem } from '@/types/product-response';
import { createContext, use, useContext, useOptimistic } from 'react';

type CartContextType = {
  cart: CartResponse | undefined;
  addCartItem: (
    productId: string,
    quantity: number,
    variation?: { attribute: string; value: string }[],
    product?: ProductResponseItem
  ) => void;
  updateCartItem: (productId: string, quantity: number, variation?: { attribute: string; value: string }[]) => void;
  removeCartItem: (productId: string, variation?: { attribute: string; value: string }[]) => void;
};

type CartAction =
  | {
      type: 'UPDATE_ITEM';
      payload: { key: string; quantity: number };
    }
  | {
      type: 'ADD_ITEM';
      payload: {
        productId: string;
        quantity: number;
        variation?: { attribute: string; value: string }[];
        product?: ProductResponseItem;
      };
    }
  | {
      type: 'REMOVE_ITEM';
      payload: { key: string };
    };

const CartContext = createContext<CartContextType | undefined>(undefined);

function createEmptyCart(): CartResponse {
  return {
    coupons: [],
    shipping_rates: [],
    shipping_address: {
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      company: '',
      phone: '',
      first_name: '',
      last_name: '',
    },
    billing_address: {
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      company: '',
      phone: '',
      email: '',
      first_name: '',
      last_name: '',
    },
    items: [],
    items_count: 0,
    items_weight: 0,
    cross_sells: [],
    needs_payment: false,
    needs_shipping: false,
    has_calculated_shipping: false,
    fees: [],
    totals: {
      total_items: '0',
      total_items_tax: '0',
      total_fees: '0',
      total_fees_tax: '0',
      total_discount: '0',
      total_discount_tax: '0',
      total_shipping: '0',
      total_shipping_tax: '0',
      total_price: '0',
      total_tax: '0',
      tax_lines: [],
      currency_code: 'USD',
      currency_symbol: '$',
      currency_minor_unit: 2,
      currency_decimal_separator: '.',
      currency_thousand_separator: ',',
      currency_prefix: '$',
      currency_suffix: '',
    },
    errors: [],
    payment_methods: [],
    payment_requirements: [],
    extensions: {},
  };
}

// Helper function to generate variation key for comparison
function getVariationKey(variation?: { attribute: string; value: string }[]): string {
  if (!variation || variation.length === 0) return 'no-variation';
  return variation
    .map((v) => `${v.attribute}:${v.value}`)
    .sort()
    .join('|');
}

// Helper function to find matching cart item
function findCartItemIndex(
  items: CartItem[],
  productId: number,
  variation?: { attribute: string; value: string }[]
): number {
  const variationKey = getVariationKey(variation);

  return items.findIndex((item) => {
    const itemVariationKey = getVariationKey(item.variation.map((v) => ({ attribute: v.attribute, value: v.value })));
    return item.id === productId && itemVariationKey === variationKey;
  });
}

function cartReducer(state: CartResponse | undefined, action: CartAction): CartResponse {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, quantity, variation, product } = action.payload;

      // Check if item already exists in cart
      const existingItemIndex = findCartItemIndex(currentCart.items, parseInt(productId, 10), variation);

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedItems = currentCart.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + quantity;
            const unitPrice = parseFloat(item.prices.sale_price || item.prices.price || '0');
            const lineTotal = unitPrice * newQuantity;

            return {
              ...item,
              quantity: newQuantity,
              totals: {
                ...item.totals,
                line_total: lineTotal.toString(),
                line_subtotal: lineTotal.toString(),
              },
              prices: {
                ...item.prices,
                price: item.prices.price,
                sale_price: item.prices.sale_price,
                regular_price: item.prices.regular_price,
              },
            };
          }
          return item;
        });
      } else {
        // Item doesn't exist, create new cart item
        const unitPrice = parseFloat(product?.prices.sale_price || product?.prices.price || '0');
        const lineTotal = unitPrice * quantity;

        const newCartItem: CartItem = {
          key: `${productId}-${getVariationKey(variation)}-${Date.now()}`,
          id: parseInt(productId, 10),
          type: product?.type || 'simple',
          quantity,
          catalog_visibility: 'visible',
          quantity_limits: {
            minimum: 1,
            maximum: 999,
            multiple_of: 1,
            editable: true,
          },
          name: product?.name || '',
          summary: product?.short_description || '',
          short_description: product?.short_description || '',
          description: product?.description || '',
          sku: product?.sku || '',
          low_stock_remaining: product?.low_stock_remaining || null,
          backorders_allowed: product?.is_on_backorder || false,
          show_backorder_badge: product?.is_on_backorder || false,
          sold_individually: product?.sold_individually || false,
          permalink: product?.permalink || '',
          images:
            product?.images?.map((img) => ({
              id: img.id,
              src: img.src,
              thumbnail: img.thumbnail,
              srcset: img.srcset,
              sizes: img.sizes,
              name: img.name,
              alt: img.alt,
            })) || [],
          variation: variation
            ? variation.map((v) => ({
                attribute: v.attribute,
                value: v.value,
                raw_attribute: v.attribute,
              }))
            : [],
          prices: {
            price: product?.prices.price || '',
            regular_price: product?.prices.regular_price || '',
            sale_price: product?.prices.sale_price || '',
            price_range: product?.prices.price_range || null,
            raw_prices: {
              precision: 2,
              price: product?.prices.price || '',
              regular_price: product?.prices.regular_price || '',
              sale_price: product?.prices.sale_price || '',
            },
            currency_code: currentCart.totals.currency_code || 'USD',
            currency_symbol: currentCart.totals.currency_symbol,
            currency_minor_unit: currentCart.totals.currency_minor_unit,
            currency_decimal_separator: currentCart.totals.currency_decimal_separator,
            currency_thousand_separator: currentCart.totals.currency_thousand_separator,
            currency_prefix: currentCart.totals.currency_prefix,
            currency_suffix: currentCart.totals.currency_suffix,
          },
          totals: {
            line_subtotal: lineTotal.toString(),
            line_subtotal_tax: '0',
            line_total: lineTotal.toString(),
            line_total_tax: '0',
            currency_code: currentCart.totals.currency_code || 'USD',
            currency_symbol: currentCart.totals.currency_symbol,
            currency_minor_unit: currentCart.totals.currency_minor_unit,
            currency_decimal_separator: currentCart.totals.currency_decimal_separator,
            currency_thousand_separator: currentCart.totals.currency_thousand_separator,
            currency_prefix: currentCart.totals.currency_prefix,
            currency_suffix: currentCart.totals.currency_suffix,
          },
          extensions: {},
          item_data: [],
        };

        updatedItems = [...currentCart.items, newCartItem];
      }

      // Calculate new totals
      const newTotalPrice = updatedItems.reduce((total, item) => total + parseFloat(item.totals.line_total || '0'), 0);
      const newItemsCount = updatedItems.reduce((total, item) => total + item.quantity, 0);

      return {
        ...currentCart,
        items: updatedItems,
        items_count: newItemsCount,
        totals: {
          ...currentCart.totals,
          total_items: newTotalPrice.toString(),
          total_price: newTotalPrice.toString(),
        },
      };
    }

    case 'UPDATE_ITEM': {
      const { key, quantity } = action.payload;

      const updatedItems = currentCart.items.map((item) => {
        if (item.key === key) {
          return { ...item, quantity };
        }
        return item;
      });

      // Calculate new totals
      const newTotalPrice = updatedItems.reduce(
        (total, item) => total + parseFloat(item.prices.sale_price || '0') * item.quantity,
        0
      );
      const newItemsCount = updatedItems.reduce((total, item) => total + item.quantity, 0);

      return {
        ...currentCart,
        items: updatedItems,
        items_count: newItemsCount,
        totals: {
          ...currentCart.totals,
          total_items: newTotalPrice.toString(),
          total_price: newTotalPrice.toString(),
        },
      };
    }

    case 'REMOVE_ITEM': {
      const { key } = action.payload;

      const updatedItems = currentCart.items.filter((item) => item.key !== key);

      // Calculate new totals
      const newTotalPrice = updatedItems.reduce((total, item) => total + parseFloat(item.totals.line_total || '0'), 0);
      const newItemsCount = updatedItems.reduce((total, item) => total + item.quantity, 0);

      return {
        ...currentCart,
        items: updatedItems,
        items_count: newItemsCount,
        totals: {
          ...currentCart.totals,
          total_items: newTotalPrice.toString(),
          total_price: newTotalPrice.toString(),
        },
      };
    }

    default:
      return currentCart;
  }
}

export function CartProvider({
  cartPromise,
  children,
}: {
  children: React.ReactNode;
  cartPromise: Promise<CartResponse | undefined>;
}) {
  const cart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(cart, cartReducer);

  const addCartItem = (
    productId: string,
    quantity: number,
    variation?: { attribute: string; value: string }[],
    product?: ProductResponseItem
  ) => {
    updateOptimisticCart({ type: 'ADD_ITEM', payload: { productId, quantity, variation, product } });
  };

  const updateCartItem = (key: string, quantity: number) => {
    updateOptimisticCart({ type: 'UPDATE_ITEM', payload: { key, quantity } });
  };

  const removeCartItem = (key: string) => {
    updateOptimisticCart({ type: 'REMOVE_ITEM', payload: { key } });
  };

  return (
    <CartContext.Provider value={{ cart: optimisticCart, addCartItem, updateCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
