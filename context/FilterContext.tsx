import React, { createContext, ReactNode, useContext, useState } from 'react';

export type FilterId = string;

export interface FilterContextType {
  activeFilterIds: FilterId[];
  toggleFilter: (filterId: string) => void;
  clearFilters: () => void;
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

  const toggleFilter = (filterId: FilterId) => {
    setActiveFilterIds((currFilterIds) => {
      if (currFilterIds.includes(filterId)) {
        return currFilterIds.filter((id) => id !== filterId);
      }

      return [...currFilterIds, filterId];
    });
  };

  const clearFilters = () => {
    setActiveFilterIds([]);
  };

  return (
    <FilterContext.Provider
      value={{ activeFilterIds, toggleFilter, clearFilters }}
    >
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
