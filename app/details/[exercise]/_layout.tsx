import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function ExerciseDetailsLayout() {
  const colors = useThemeColors();
  const { exercise } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: `${exercise}`,
          headerBackTitle: 'Search',
          headerTintColor: colors.foreground,
        }}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 85,
            paddingBottom: 18,
            paddingTop: 12,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.foregroundMuted,
          tabBarLabelStyle: { fontWeight: '600', fontSize: 12, marginTop: 4 },
          tabBarItemStyle: {
            borderRightWidth: 1,
            borderRightColor: colors.border,
            justifyContent: 'center',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Overview',
            tabBarLabel: 'Overview',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="fitness" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarLabel: 'History',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="charts"
          options={{
            title: 'Trends',
            tabBarLabel: 'Trends',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" size={size} color={color} />
            ),
            // Have to manually set this border width to 0
            tabBarItemStyle: { borderRightWidth: 0 },
          }}
        />
      </Tabs>
    </View>
  );
}
