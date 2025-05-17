'use client';

import { createContext, useContext, useOptimistic } from 'react';
import { Cart } from '@/types';
import { Product } from '@/features/product/types';

type CartContextType = {
  cart: Cart | undefined;
  addCartItem: (variation: { attribute: string; value: string }[], product: Product, quantity: number) => void;
};

type CartAction =
  | {
      type: 'UPDATE_ITEM';
      payload: { id: number; quantity: number };
    }
  | {
      type: 'ADD_ITEM';
      payload: { variation: { attribute: string; value: string }[]; product: Product; quantity: number };
    };

const CartContext = createContext<CartContextType | undefined>(undefined);

function createEmptyCart(): Cart {
  return {
    items: [],
    coupons: [],
    fees: [],
    totals: {
      total_items: '0',
      total_items_tax: '0',
      total_fees: '0',
      total_fees_tax: '0',
      total_discount: '0',
      total_discount_tax: '0',
      total_shipping: null,
      total_shipping_tax: null,
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
    shipping_address: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: 'DE',
      postcode: '',
      country: 'US',
      phone: '',
    },
    billing_address: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: 'DE',
      postcode: '',
      country: 'US',
      email: '',
      phone: '',
    },
    needs_payment: false,
    needs_shipping: false,
    payment_requirements: ['products'],
    has_calculated_shipping: false,
    shipping_rates: [],
    items_count: 0,
    items_weight: 0,
    cross_sells: [],
    errors: [],
    payment_methods: [],
    extensions: {},
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;

      return {
        ...currentCart,
        items: [
          ...currentCart.items,
          {
            id: product.id,
            key: new Date().getMilliseconds().toString(),
            type: product.type || 'simple',
            quantity: quantity,
            quantity_limits: {
              minimum: product.add_to_cart?.minimum || 1,
              maximum: product.add_to_cart?.maximum || 99,
              multiple_of: product.add_to_cart?.multiple_of || 1,
            },
            low_stock_remaining: product.low_stock_remaining || null,
            sold_individually: product.sold_individually || false,
            backorders_allowed: product.is_on_backorder || false,
            images: product.images || [],
            name: product.name,
          },
        ],
        items_count: currentCart.items_count + Number(quantity),
      };
    }

    default:
      return currentCart;
  }
}

export function CartProvider({ cart, children }: { children: React.ReactNode; cart: Cart | undefined }) {
  const [optimisticCart, updateOptimisticCart] = useOptimistic(cart, cartReducer);

  const addCartItem = (variation: { attribute: string; value: string }[], product: Product, quantity: number) => {
    updateOptimisticCart({ type: 'ADD_ITEM', payload: { variation, product, quantity } });
  };

  return <CartContext.Provider value={{ cart: optimisticCart, addCartItem }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
