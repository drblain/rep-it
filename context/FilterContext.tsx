import React, { createContext, ReactNode, useContext, useState } from 'react';

export type ItemType = any;

export type FilterFn = (item: ItemType) => boolean;

export interface FilterContextType {
  activeFilters: FilterFn[];
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterFn[]>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export interface FilterProviderProps {
  children: ReactNode;
  initialFilters?: FilterFn[];
}

export const FilterProvider = ({
  children,
  initialFilters,
}: FilterProviderProps) => {
  const [activeFilters, setActiveFilters] = useState<FilterFn[]>(() => {
    return initialFilters ?? [];
  });

  return (
    <FilterContext.Provider value={{ activeFilters, setActiveFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useSearchFilter must be used within a FilterProvider');
  }
  return context;
};
