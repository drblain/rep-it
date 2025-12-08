import { db } from '@/db/client';
import { PAGE_SIZE } from '@/db/constants';
import {
  exercise_muscles,
  exercises,
  muscle_groups,
  muscles,
} from '@/db/schema';
import { SearchResult } from '@/db/types';
import { parseTargetMuscle } from '@/db/utils';
import { asc, eq, like, or, sql } from 'drizzle-orm';
import { useCallback, useEffect, useState } from 'react';

export function useExerciseSearch(searchText: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
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
        const query = await db
          .select({
            id: sql<string>`cast(${exercises.id} AS text)`,
            name: exercises.name,
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
          .from(exercises)
          .leftJoin(
            exercise_muscles,
            eq(exercises.id, exercise_muscles.exerciseId)
          )
          .leftJoin(muscles, eq(exercise_muscles.muscleId, muscles.id))
          .leftJoin(muscle_groups, eq(muscles.muscleGroupId, muscle_groups.id))
          .where(
            or(
              like(exercises.name, searchText),
              like(muscle_groups.name, searchText),
              like(muscles.commonName, searchText),
              like(muscles.name, searchText)
            )
          )
          .orderBy(asc(exercises.name))
          .groupBy(exercises.id)
          .limit(PAGE_SIZE)
          .offset(pageNum * PAGE_SIZE);

        const processedResults = query.map((row) => {
          const targetMuscle = parseTargetMuscle(row.muscles_data);

          return {
            ...row,
            target_muscle: targetMuscle,
          };
        });

        if (query.length < PAGE_SIZE) {
          setHasMore(false);
        }

        setResults(
          (previousResults) =>
            (pageNum === 0
              ? processedResults
              : [...previousResults, ...processedResults]) as SearchResult[]
        );
      } catch (error) {
        console.log('Failed to fetch exercises: ', error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchText, hasMore, isLoading]
  );

  const refresh = () => {
    setPage(0);
    setHasMore(true);
    fetchPage(0, true);
  };

  useEffect(refresh, [searchText]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPage(nextPage);
    }
  };

  return { exercises: results, loadMore, refresh, isLoading, hasMore };
}
