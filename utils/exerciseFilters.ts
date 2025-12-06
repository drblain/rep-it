import { FilterFn } from '@/context/FilterContext';

export type TaggedFilterFn = FilterFn & { id: string };

export const FILTER_IDS = {
  FAVORITES: 'favorites',
  CHEST: 'chest',
  LEGS: 'legs',
  BACK: 'back',
};
