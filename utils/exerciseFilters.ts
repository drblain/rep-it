import { FilterFn } from '@/context/FilterContext';
import { UserExercise } from '@/hooks/useUserExercises';

export type TaggedFilterFn = FilterFn & { id: string };

export const FILTER_IDS = {
  FAVORITES: 'favorites',
  CHEST: 'chest',
  LEGS: 'legs',
  BACK: 'back',
} as const;

export const createFavoritesFilter = (): TaggedFilterFn => {
  const fn: TaggedFilterFn = (exercise: UserExercise) =>
    exercise.is_favorite === true;
  fn.id = FILTER_IDS.FAVORITES;
  return fn;
};
