import { db } from '@/db/client';
import * as dbConsts from '@/db/constants';
import {
  exercise_muscles,
  exercises,
  muscle_groups,
  user_exercises,
} from '@/db/schema';
import { and, eq, exists } from 'drizzle-orm';
const PREFIXES = {
  FAVORITE: 'fav',
  GROUP: 'group',
  MUSCLE: 'muscle',
} as const;

export const makeFilterId = (prefix: string, value: string | number) =>
  `${prefix}:${value}`;

export const FILTER_OPTIONS = [
  {
    label: 'General',
    data: [{ label: 'Favorited', id: makeFilterId(PREFIXES.FAVORITE, 'true') }],
  },
  {
    label: 'Muscle Groups',
    data: Object.entries(dbConsts.MUSCLE_GROUP_LABELS).map(([id, label]) => ({
      label,
      id: makeFilterId(PREFIXES.GROUP, id),
    })),
  },
  {
    label: 'Muscle',
    data: Object.entries(dbConsts.MUSCLE_COMMON_NAMES).map(([id, label]) => ({
      label: `${label}`,
      id: makeFilterId(PREFIXES.MUSCLE, id),
    })),
  },
];

export const getSqlConditionForFilterId = (filterId: string) => {
  const [prefix, value] = filterId.split(':');
  const numericValue = parseInt(value, 10);

  switch (prefix) {
    case PREFIXES.FAVORITE:
      return eq(user_exercises.isFavorite, true);
    case PREFIXES.GROUP:
      return eq(muscle_groups.id, numericValue);
    case PREFIXES.MUSCLE:
      return exists(
        db
          .select()
          .from(exercise_muscles)
          .where(
            and(
              eq(exercise_muscles.exerciseId, exercises.id),
              eq(exercise_muscles.muscleId, numericValue)
            )
          )
      );

    default:
      return undefined;
  }
};
