import { getSqlConditionForFilterId } from '@/context/exerciseFilters';
import { FilterId } from '@/context/FilterContext';
import { db } from '@/db/client';
import {
  exercise_muscles,
  exercises,
  muscle_groups,
  muscles,
  user_exercises,
} from '@/db/schema';
import { and, asc, eq, like, or, sql } from 'drizzle-orm';
import { useCallback, useEffect, useState } from 'react';

export interface UserExercise {
  id: string;
  name: string;
  is_favorite: boolean | null;
  muscle_group: string;
  target_muscle: string;
}

const PAGE_SIZE = 20;

export function useUserExercises(
  userId: number,
  filterText: string,
  activeFilterIds: FilterId[]
) {
  const [data, setData] = useState<UserExercise[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPage = useCallback(
    async (pageNum: number, isRefresh: boolean = false) => {
      if (!isRefresh && (!hasMore || isLoading)) {
        return;
      }

      setIsLoading(true);

      try {
        const conditions = [eq(user_exercises.userId, userId)];

        if (filterText) {
          const searchPattern = `%${filterText}%`;
          conditions.push(
            or(
              like(exercises.name, searchPattern),
              like(muscle_groups.name, searchPattern),
              like(muscles.commonName, searchPattern),
              like(muscles.name, searchPattern)
            )!
          );
        }

        activeFilterIds.forEach((filterId: FilterId) => {
          const sqlCondition = getSqlConditionForFilterId(filterId);
          if (sqlCondition) {
            conditions.push(sqlCondition);
          }
        });

        const results = await db
          .select({
            id: sql<string>`cast(${user_exercises.id} AS text)`,
            name: exercises.name,
            is_favorite: user_exercises.isFavorite,
            muscle_group: muscle_groups.name,
            muscles_data: sql<string>`
              GROUP_CONCAT(
                ${exercise_muscles.role} || ':' || COALESCE(
                  ${muscles.commonName},
                  ${muscles.name}
                )
              )
            `,
          })
          .from(user_exercises)
          .leftJoin(exercises, eq(user_exercises.exerciseId, exercises.id))
          .leftJoin(
            exercise_muscles,
            eq(exercises.id, exercise_muscles.exerciseId)
          )
          .leftJoin(muscles, eq(exercise_muscles.muscleId, muscles.id))
          .leftJoin(muscle_groups, eq(muscles.muscleGroupId, muscle_groups.id))
          .where(and(...conditions))
          .orderBy(asc(exercises.name))
          .groupBy(exercises.id)
          .limit(PAGE_SIZE)
          .offset(pageNum * PAGE_SIZE);

        const processedResults = results.map((row) => {
          const allMuscles = row.muscles_data
            ? row.muscles_data.split(',')
            : [];

          const primaryEntry = allMuscles.find((muscle) =>
            muscle.startsWith('primary:')
          );

          const targetMuscle = primaryEntry
            ? primaryEntry.split(':')[1]
            : allMuscles[0]
              ? allMuscles[0].split(':')[1]
              : 'Unknown';

          return {
            ...row,
            target_muscle: targetMuscle,
          };
        });

        if (results.length < PAGE_SIZE) {
          setHasMore(false);
        }

        setData(
          (previousData) =>
            (pageNum === 0
              ? processedResults
              : [...previousData, ...processedResults]) as UserExercise[]
        );
      } catch (error) {
        console.log('Failed to fetch exercises: ', error);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, filterText, activeFilterIds, hasMore, isLoading]
  );

  const refresh = () => {
    setPage(0);
    setHasMore(true);
    fetchPage(0, true);
  };

  useEffect(refresh, [filterText, activeFilterIds]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPage(nextPage);
    }
  };

  return { exercises: data, loadMore, refresh, isLoading, hasMore };
}
