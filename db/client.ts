import { sql } from 'drizzle-orm';
import { drizzle, type ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import { openDatabaseSync } from 'expo-sqlite';

import initialData from '../assets/db/initial_data.sql';
import migrations from '../drizzle/migrations';
import * as schema from './schema';

const DB_NAME = 'fitness_app.db';

export let db: ExpoSQLiteDatabase<typeof schema> = null as any;

export async function initializeDb() {
  // try {
  //   console.log('Wiping database to ensure clean state...');
  //   await deleteDatabaseAsync(DB_NAME);
  // } catch (e) {
  //   // Ignore error if DB didn't exist yet
  //   console.log('Database wipe skipped (not found).');
  // }
  const expoDb = openDatabaseSync(DB_NAME);
  db = drizzle(expoDb, { schema });

  // 2. Run Migrations (Creates all tables)
  try {
    await migrate(db, migrations);
    console.log('Migrations applied successfully.');
  } catch (e) {
    console.error('Migration failed:', e);
    throw e;
  }

  // 3. Seed Data (Populates tables)
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.exercises);
    if (result[0].count === 0) {
      console.log('Seeding initial data...');
      // Execute the seed script (assumes initial_data.sql has BEGIN/COMMIT)
      await expoDb.execAsync(initialData);
      console.log('Seeding complete!');
    }
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}
