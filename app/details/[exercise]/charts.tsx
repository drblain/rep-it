import { Stack, useGlobalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ExerciseCharts() {
  const { exercise } = useGlobalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Stack.Screen options={{ title: `${exercise}` }} />
      <Text className="text-2xl font-bold text-foreground">
        Charts for Exercise ID: {exercise}
      </Text>
    </View>
  );
}
