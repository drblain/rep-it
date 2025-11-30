import { useGlobalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ExerciseDetails() {
  const { exercise } = useGlobalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-2xl font-bold text-foreground">
        Overview for Exercise: {exercise}
      </Text>
    </View>
  );
}
