import { db } from '@/db/client';
import * as dbConsts from '@/db/constants';
import {
  exercise_muscles,
  exercises,
  muscle_groups,
  muscles,
  user_exercises,
} from '@/db/schema';
import { and, eq, exists } from 'drizzle-orm';
const PREFIXES = {
  FAVORITE: 'fav',
  GROUP: 'group',
  ANY_MUSCLE: 'any',
  PRIMARY_MUSCLE: 'primary',
} as const;

export const makeFilterId = (prefix: string, value: string | number) =>
  `${prefix}:${value}`;

export const FILTER_OPTIONS = [
  {
    label: 'General',
    data: [
      { label: 'Favorites Only', id: makeFilterId(PREFIXES.FAVORITE, 'true') },
    ],
  },
  {
    label: 'Muscle Groups',
    data: Object.entries(dbConsts.MUSCLE_GROUP_LABELS).map(([id, label]) => ({
      label,
      id: makeFilterId(PREFIXES.GROUP, id),
    })),
  },
  {
    label: 'Primary Muscle',
    data: Object.entries(dbConsts.MUSCLE_COMMON_NAMES).map(([id, label]) => ({
      label: `${label} (Primary)`,
      id: makeFilterId(PREFIXES.PRIMARY_MUSCLE, id),
    })),
  },
  {
    label: 'Any Role (Primary or Secondary)',
    data: Object.entries(dbConsts.MUSCLE_COMMON_NAMES).map(([id, label]) => ({
      label: `${label} (Any)`,
      id: makeFilterId(PREFIXES.ANY_MUSCLE, id),
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
    case PREFIXES.PRIMARY_MUSCLE:
      return eq(muscles.id, numericValue);
    case PREFIXES.ANY_MUSCLE:
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
