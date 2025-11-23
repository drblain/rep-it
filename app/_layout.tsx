import '../global.css';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { db } from '../db/client';
import migrations from '../drizzle/migrations';

// 1. Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 2. Run migrations (this happens in the background while splash is up)
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    // 3. When the database is ready (or fails), hide the splash screen
    if (success || error) {
      SplashScreen.hideAsync();
    }
  }, [success, error]);

  // 4. Loading State
  // While 'success' is false, we return nothing (or a generic View).
  // Since the Splash Screen is covering the phone, the user sees the logo,
  // not this empty view.
  if (!success) {
    return null;
  }

  // 5. Error State
  // If migrations fail, we should probably show the user something
  // after the splash screen hides.
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Migration Error: {error.message}</Text>
      </View>
    );
  }

  // 6. Success State
  // The DB is ready. Render the navigation stack.
  // The Splash Screen will fade out, revealing this content.
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'My Exercises' }} />
    </Stack>
  );
}
