import { FilterId } from '@/context/FilterContext';
import * as dbConsts from '@/db/constants';
import {
  exercise_muscles,
  muscle_groups,
  muscles,
  user_exercises,
} from '@/db/schema';
import { and, eq, SQL } from 'drizzle-orm';

export const FILTER_IDS = {
  FAVORITES: 'favorites',
  GROUP_CHEST: 'group_chest',
  GROUP_LEGS: 'group_legs',
  GROUP_BACK: 'group_back',
  MUSCLE_BICEPS: 'muscle_biceps',
  MUSCLE_TRICEPS: 'muscle_triceps',
  PRIMARY_BICEPS: 'primary_biceps',
} as const;

export const getSqlConditionForFilterId = (
  filterId: FilterId
): SQL | undefined => {
  switch (filterId) {
    case FILTER_IDS.FAVORITES:
      return eq(user_exercises.isFavorite, true);

    case FILTER_IDS.GROUP_CHEST:
      return eq(
        muscle_groups.name,
        dbConsts.MUSCLE_GROUP_LABELS[dbConsts.MUSCLE_GROUPS.CHEST]
      );

    case FILTER_IDS.GROUP_LEGS:
      return eq(
        muscle_groups.name,
        dbConsts.MUSCLE_GROUP_LABELS[dbConsts.MUSCLE_GROUPS.LEGS]
      );

    case FILTER_IDS.GROUP_BACK:
      return eq(
        muscle_groups.name,
        dbConsts.MUSCLE_GROUP_LABELS[dbConsts.MUSCLE_GROUPS.BACK]
      );

    // More muscle group filters here

    case FILTER_IDS.MUSCLE_BICEPS:
      return eq(
        muscles.commonName,
        dbConsts.MUSCLE_COMMON_NAMES[dbConsts.MUSCLES.BICEPS_BRACHII]
      );

    case FILTER_IDS.MUSCLE_TRICEPS:
      return eq(
        muscles.commonName,
        dbConsts.MUSCLE_COMMON_NAMES[dbConsts.MUSCLES.TRICEPS_BRACHII]
      );

    // More muscle inclusion filters here

    case FILTER_IDS.PRIMARY_BICEPS:
      const sqlCondition = getSqlConditionForFilterId(FILTER_IDS.MUSCLE_BICEPS);

      if (!sqlCondition) {
        return undefined;
      }

      return and(
        sqlCondition,
        eq(exercise_muscles.role, dbConsts.EXERCISE_ROLES.PRIMARY)
      );

    // More primary muscle filters here

    default:
      console.log('Got invalid filter ID: ', filterId);
      return undefined;
  }
};
