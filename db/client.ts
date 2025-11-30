import { drizzle, type ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { Asset } from 'expo-asset';
import { File, Paths } from 'expo-file-system';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

const DB_NAME = 'fitness_app.db';

export let db: ExpoSQLiteDatabase<typeof schema> = null as any;

export async function initializeDb() {
  const dbFile = new File(Paths.document, DB_NAME);

  if (!dbFile.exists) {
    const dbAsset = require('../assets/db/schema.db');
    const asset = Asset.fromModule(dbAsset);
    await asset.downloadAsync();

    const sourceFile = new File(asset.localUri || asset.uri);

    sourceFile.copy(dbFile);
  }

  const expoDb = openDatabaseSync(DB_NAME);
  db = drizzle(expoDb, { schema });
}
