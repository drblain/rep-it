import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-foreground text-xl font-bold">
        Tailwind is working!
      </Text>
    </View>
  );
}
