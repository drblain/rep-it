import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

export const muscle_groups = sqliteTable('muscle_groups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});

export const muscles = sqliteTable('muscles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  commonName: text('common_name').notNull(),
  muscleGroupId: integer('muscle_group_id')
    .notNull()
    .references(() => muscle_groups.id),
});

export const equipment = sqliteTable('equipment', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});

export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
});

export const exercise_muscles = sqliteTable(
  'exercise_muscles',
  {
    exerciseId: integer('exercise_id')
      .references(() => exercises.id)
      .notNull(),
    muscleId: integer('muscle_id')
      .references(() => muscles.id)
      .notNull(),
    role: text('role').notNull().default('primary'),
  },
  (t) => [primaryKey({ columns: [t.exerciseId, t.muscleId] })]
);

export const exercise_equipment = sqliteTable(
  'exercise_equipment',
  {
    exerciseId: integer('exercise_id')
      .references(() => exercises.id)
      .notNull(),
    equipmentId: integer('equipment_id')
      .references(() => equipment.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.exerciseId, t.equipmentId] })]
);

const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

const user_exercises = sqliteTable('user_exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  exerciseId: integer('exercise_id')
    .references(() => exercises.id)
    .notNull(),
  notes: text('notes'),
});

export const user_sets = sqliteTable('user_sets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userExerciseId: integer('user_exercise_id')
    .references(() => user_exercises.id)
    .notNull(),
  reps: integer('reps'),
  weight: integer('weight'),
  isWarmup: integer('is_warmup', { mode: 'boolean' }).default(false),
  timestamp: integer('timestamp'),
});

export const user_exercise_images = sqliteTable('user_exercise_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userExerciseId: integer('user_exercise_id')
    .notNull()
    .references(() => user_exercises.id),
  url: text('url').notNull(),
});
