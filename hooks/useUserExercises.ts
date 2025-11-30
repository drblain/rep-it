import { db } from '@/db/client';
import {
  exercise_muscles,
  exercises,
  muscle_groups,
  muscles,
} from '@/db/schema';

import { and, eq, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

export interface UserExercise {
  id: string;
  name: string;
  muscle_group: string | null;
  target_muscle: string | null;
}

export function useUserExercises() {
  const { data } = useLiveQuery(
    db
      .select({
        id: sql<string>`cast(${exercises.id} AS text)`,
        name: exercises.name,

        // --- THIS LINE WAS LIKELY MISSING ---
        muscle_group: muscle_groups.name,
        // ------------------------------------

        target_muscle: sql<string>`
          COALESCE(
            ${muscles.commonName},
            ${muscles.name}
          )
        `,
      })
      .from(exercises)
      .leftJoin(
        exercise_muscles,
        and(
          eq(exercises.id, exercise_muscles.exerciseId),
          eq(exercise_muscles.role, 'primary')
        )
      )
      .leftJoin(muscles, eq(exercise_muscles.muscleId, muscles.id))
      .leftJoin(muscle_groups, eq(muscles.muscleGroupId, muscle_groups.id))
      .groupBy(exercises.id)
  );

  const isLoading = data === undefined;

  return {
    exercises: (data ?? []) as UserExercise[], // Explicitly cast if needed, but inference should work
    isLoading,
  };
}
