import '@/global.css';

import { useDatabaseInit } from '@/hooks/useDatabaseInit';
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
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 1. Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const colors = useThemeColors();

  // 2. Run migrations (this happens in the background while splash is up)
  const { isDbReady, initError } = useDatabaseInit();

  if (!isDbReady) {
    return null;
  }

  if (initError) {
    return (
      <View className="flex-1 justify-center align-middle p-20">
        <Text className="text-xl font-bold text-red mb-10">Database Error</Text>
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
