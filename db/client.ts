import * as schema from '@/db/schema';
import { sql } from 'drizzle-orm';
import { drizzle, type ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator'; // Manual runner
import { openDatabaseSync } from 'expo-sqlite';

// 1. Import your migrations and seed data
import migrations from '@/drizzle/migrations';
import initialData from '../assets/db/initial_data.sql';

const DB_NAME = 'fitness_app.db';

export let db: ExpoSQLiteDatabase<typeof schema> = null as any;

export async function initializeDb() {
  // 2. Open the database (creates a blank file if missing)
  const expoDb = openDatabaseSync(DB_NAME);
  db = drizzle(expoDb, { schema });

  // 3. Run Migrations (Creates tables: exercises, muscles, etc.)
  // This replaces the need to copy schema.db!
  try {
    await migrate(db, migrations);
    console.log('Migrations applied successfully.');
  } catch (e) {
    console.error('Migration error:', e);
  }

  // 4. Seed Data (if empty)
  try {
    // Check if the exercises table is empty
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.exercises);

    if (result[0].count === 0) {
      console.log('Database is empty. Seeding initial data...');

      // Execute the SQL script to populate rows
      // We wrap in a transaction for safety
      await expoDb.execAsync(initialData);

      console.log('Seeding complete!');
    } else {
      console.log('Database already populated.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
