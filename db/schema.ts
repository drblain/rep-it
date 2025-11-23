import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  muscleGroup: text('muscle_group'), // Legs, Arms, Back, etc.
  targetMuscle: text('target_muscle'), // Biceps, Quadriceps, etc.
  equipment: text('equipment'), // Dumbbell, Barbell, Leg Press Machine, etc.
  category: text('category'), // Compound, Isolation, etc.
  imagePath: text('image_path'), // Local path or URL to an image
  description: text('description'),
});

export const sets = sqliteTable('sets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  exerciseId: integer('exercise_id').references(() => exercises.id),
  reps: integer('reps'),
  weight: integer('weight'), // in pounds or kg
  date: integer('timestamp'),
});
