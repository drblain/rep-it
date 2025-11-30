import { drizzle } from 'drizzle-orm/expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

const DB_NAME = 'fitness_app.db';

export let db: ReturnType<typeof drizzle> = null as any;

export async function initializeDb() {
  // 1. Force-cast FileSystem to 'any' to bypass SDK 54 strict type errors.
  // We know 'documentDirectory' exists on the native module at runtime.
  const fs = FileSystem as any;
  const docDir = fs.documentDirectory;

  if (!docDir) {
    throw new Error('FileSystem.documentDirectory is not available.');
  }

  const dbPath = `${docDir}${DB_NAME}`;

  // 2. Check if DB exists
  const fileInfo = await fs.getInfoAsync(dbPath);

  if (!fileInfo.exists) {
    console.log('First launch detected. Copying database...');

    // 3. Update this require path to match your folder structure!
    // If client.ts is in src/db, and assets is in src/assets:
    const dbAsset = require('../assets/db/schema.db');

    const asset = Asset.fromModule(dbAsset);
    await asset.downloadAsync();

    if (!asset.localUri && !asset.uri) {
      throw new Error('Failed to download database asset.');
    }

    // 4. Copy file
    await fs.copyAsync({
      from: asset.localUri || asset.uri,
      to: dbPath,
    });
  }

  // 5. Connect
  const expoDb = openDatabaseSync(DB_NAME);
  db = drizzle(expoDb, { schema });
  console.log('Database initialized successfully.');
}
