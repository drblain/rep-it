import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const muscle_groups = sqliteTable('muscle_groups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // Chest, Back, Legs
});

export const muscles = sqliteTable('muscles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // Pectoralis Major, Latissimus Dorsi
  commonName: text('common_name').notNull(), // Pectorals, Lats
  muscleGroupId: integer('muscle_group_id')
    .notNull()
    .references(() => muscle_groups.id),
});

export const equipment = sqliteTable('equipment', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // Barbell, Dumbbell, Cable
});

export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
});

// Allows: "Squat" targets "Quads" (Primary) AND "Glutes" (Secondary)
export const exercise_muscles = sqliteTable('exercise_muscles', {
  exerciseId: integer('exercise_id')
    .references(() => exercises.id)
    .notNull()
    .primaryKey(),
  muscleId: integer('muscle_id')
    .references(() => muscles.id)
    .notNull()
    .primaryKey(),
  role: text('role').notNull().default('primary'), // 'primary' | 'secondary'
});

// Allows: "Weighted Dip" uses "Dip Station" AND "Dip Belt"
export const exercise_equipment = sqliteTable('exercise_equipment', {
  exerciseId: integer('exercise_id')
    .references(() => exercises.id)
    .notNull()
    .primaryKey(),
  equipmentId: integer('equipment_id')
    .references(() => equipment.id)
    .notNull()
    .primaryKey(),
});

const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  // Future fields: passwordHash, email, createdAt, etc.
});

const user_exercises = sqliteTable('user_exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id), // For future multi-user support
  exerciseId: integer('exercise_id')
    .references(() => exercises.id)
    .notNull(),
  notes: text('notes'),
});

export const user_sets = sqliteTable('sets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userExerciseId: integer('user_exercise_id')
    .references(() => user_exercises.id)
    .notNull(),

  // Data
  reps: integer('reps'),
  weight: integer('weight'),
  isWarmup: integer('is_warmup', { mode: 'boolean' }).default(false), // Useful for excluding from stats

  timestamp: integer('timestamp'), // Time the specific set was completed
});

export const user_exercise_images = sqliteTable('images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userExerciseId: integer('user_exercise_id')
    .notNull()
    .references(() => user_exercises.id),
  url: text('url').notNull(),
});
