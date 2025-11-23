import '@/global.css';

import { Colors } from '@/constants/Colors';
import { db } from '@/db/client';
import migrations from '@/drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 1. Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() || 'light';

  const theme = Colors[colorScheme] || Colors.light;

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
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'My Exercises' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
