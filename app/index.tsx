import { useThemeColors } from '@/hooks/useThemeColors';
import { Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// This should be where the search screen is displayed

export default function Index() {
  const insets = useSafeAreaInsets();

  const colors = useThemeColors();

  return (
    <View
      className="flex-1 bg-background-secondary items-center justify-start"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="flex-row h-16 w-full items-center bg-background border border-border">
        <TextInput className="border border-border bg-foreground text-foreground-muted h-11"></TextInput>
      </View>
      <Text className="text-foreground text-xl font-bold">
        Tailwind is working!
      </Text>
    </View>
  );
}
