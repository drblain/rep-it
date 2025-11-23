import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 dark:bg-black light:bg-white items-center justify-center">
      <Text className="dark:text-white light:text-black text-xl font-bold">
        Tailwind is working!
      </Text>
    </View>
  );
}
