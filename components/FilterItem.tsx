import { FilterId } from '@/context/FilterContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';

import { Text, TouchableOpacity, View } from 'react-native';

export interface FilterItemProps {
  key: FilterId;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function FilterItem({
  key,
  label,
  isActive,
  onPress,
}: FilterItemProps) {
  const colors = useThemeColors();

  return (
    <View className="h-20 flex-row items-center">
      <TouchableOpacity onPress={onPress}>
        <Ionicons
          name={isActive ? 'checkmark-done' : 'checkmark'}
          size={20}
          color={colors.secondary}
        />
      </TouchableOpacity>
      <Text className="text-lg font-medium">{label}</Text>
    </View>
  );
}
