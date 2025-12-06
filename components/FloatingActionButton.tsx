import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface FloatingActionButtonProps {
  text: string;
  style: ViewStyle;
  action: () => void;
}

export default function FloatingActionButton({
  text,
  style,
  action,
}: FloatingActionButtonProps) {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 justify-center items-center"
      pointerEvents="box-none"
      style={style}
    >
      <TouchableOpacity
        className="bg-background px-8 py-4 rounded-full shadow-lg flex-row items-center"
        onPress={action}
      >
        <Text className="text-foreground text-lg font-bold tracking-wide">
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
