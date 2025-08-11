'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useOptimistic, useState } from 'react';
import type { ProductVariation } from '@/types/variation';

type ProductState = {
  [key: string]: string;
};

type ProductContextType = {
  optimisticOptions: ProductState;
  updateOption: (name: string, value: string) => ProductState;
  removeOption: (name: string) => ProductState;
  selectedVariation: ProductVariation | undefined;
  setSelectedVariation: React.Dispatch<React.SetStateAction<ProductVariation | undefined>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(undefined);

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [optimisticOptions, setOptimisticOptions] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update,
    })
  );

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value };
    setOptimisticOptions(newState);
    return { ...optimisticOptions, ...newState };
  };

  const removeOption = (name: string) => {
    setOptimisticOptions({ ...optimisticOptions, [name]: '' });
    return { ...optimisticOptions, [name]: '' };
  };

  return (
    <ProductContext.Provider
      value={{ optimisticOptions, updateOption, removeOption, selectedVariation, setSelectedVariation }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
