import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';

import { Text, TouchableOpacity, View } from 'react-native';

export interface FilterItemProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function FilterItem({
  label,
  isActive,
  onPress,
}: FilterItemProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      className="h-20 flex-row items-center py-3 px-4 active:bg-background-muted rounded-lg"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="mr-3">
        <Ionicons
          name={isActive ? 'checkbox' : 'square-outline'}
          size={20}
          color={isActive ? colors.primary : colors.foregroundMuted}
        />
      </View>
      <Text
        className={`text-lg ${isActive ? 'text-foreground font-semibold' : 'text-foreground-secondary font-medium'}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
