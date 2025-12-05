import { useGlobalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

export default function ExerciseDetails() {
  const { exercise } = useGlobalSearchParams();

  return (
    <View className="flex-1 justify-start bg-background items-start p-5">
      <Text className="text-2xl font-bold text-foreground">{exercise}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('@/assets/images/react-logo.png')}
      />
    </View>
  );
}
