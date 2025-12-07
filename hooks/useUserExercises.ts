import { db } from '@/db/client';
import {
  exercise_muscles,
  exercises,
  muscle_groups,
  muscles,
  user_exercises,
} from '@/db/schema';

import { and, eq, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

export interface UserExercise {
  id: string;
  name: string;
  is_favorite: boolean | null;
  muscle_group: string;
  target_muscle: string;
}

export function useUserExercises(userId: number) {
  const { data } = useLiveQuery(
    db
      .select({
        id: sql<string>`cast(${user_exercises.id} AS text)`,
        name: exercises.name,
        is_favorite: user_exercises.isFavorite,
        muscle_group: muscle_groups.name,
        target_muscle: sql<string>`
          COALESCE(
            ${muscles.commonName},
            ${muscles.name}
          )
        `,
      })
      .from(user_exercises)
      .where(eq(user_exercises.exerciseId, userId))
      .leftJoin(exercises, eq(user_exercises.exerciseId, exercises.id))
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
  data;

  const isLoading = data === undefined;

  return {
    exercises: (data ?? []) as UserExercise[], // Explicitly cast if needed, but inference should work
    isLoading,
  };
}
