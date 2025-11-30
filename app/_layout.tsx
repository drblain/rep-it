import '@/global.css';

import { initializeDb } from '@/db/client';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 1. Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const colors = useThemeColors();

  // 2. Run migrations (this happens in the background while splash is up)
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
      }

      SplashScreen.hideAsync();
    };

    setup();
  }, []);

  if (!isDbReady) {
    return null;
  }

  if (initError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'red',
            marginBottom: 10,
          }}
        >
          Database Error
        </Text>
        <Text style={{ textAlign: 'center', color: '#333' }}>
          {initError.message}
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${colorScheme}`}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.foreground,
            }}
          >
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </ThemeProvider>
    </View>
  );
}
