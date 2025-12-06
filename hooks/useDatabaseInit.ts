import { initializeDb } from '@/db/client';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export function useDatabaseInit() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [initError, setInitError] = useState<Error | null>(null);

  useEffect(() => {
    const setup = async () => {
      try {
        await initializeDb();
        setIsDbReady(true);
      } catch (e) {
        console.error('Database initialization failed:', e);
        setInitError(e as Error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    setup();
  }, []);

  return { isDbReady, initError };
}
