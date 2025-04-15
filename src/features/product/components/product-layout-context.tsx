'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ProductLayoutContextType = {
  layout: 'grid' | 'list';
  setLayout: Dispatch<SetStateAction<'grid' | 'list'>>;
};

const ProductLayoutContext = createContext<ProductLayoutContextType | undefined>(undefined);

export function ProductLayoutContextProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  return <ProductLayoutContext value={{ layout, setLayout }}>{children}</ProductLayoutContext>;
}

export function useProductLayoutContext() {
  const context = useContext(ProductLayoutContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
