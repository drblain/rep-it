import React, { createContext, ReactNode, useContext, useState } from 'react';

export type FilterId = string;

export interface FilterContextType {
  activeFilterIds: FilterId[];
  setFilters: (filterIds: FilterId[]) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export interface FilterProviderProps {
  children: ReactNode;
  initialFilters?: FilterId[];
}

export const FilterProvider = ({
  children,
  initialFilters,
}: FilterProviderProps) => {
  const [activeFilterIds, setActiveFilterIds] = useState<FilterId[]>(() => {
    return initialFilters ?? [];
  });

  const setFilters = (filterIds: FilterId[]) => {
    setActiveFilterIds(filterIds);
  };

  return (
    <FilterContext.Provider value={{ activeFilterIds, setFilters }}>
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
