import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  style?: ViewStyle;
}

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  style,
}: SearchBarProps) {
  const colors = useThemeColors();

  return (
    <View
      className="flex-row px-4 pb-4 items-center bg-background border border-border"
      style={style}
    >
      <View className="flex-1 flex-row items-center bg-input rounded-lg px-3 h-11 mr-3 border border-border">
        <Ionicons
          name="search"
          size={20}
          color={colors.foregroundSecondary}
          style={{ marginRight: 8 }}
        />
        <TextInput
          // Consider adding border border-border and bg-foreground-muted to this search box
          className="flex-1 text-base text-foreground h-full"
          placeholder="Search..."
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.foregroundMuted}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.foregroundMuted}
            />
          </TouchableOpacity>
        )}
      </View>
      {onFilterPress && (
        <TouchableOpacity
          className="w-11 h-11 bg-background-secondary rounded-lg justify-center items-center border border-border"
          onPress={onFilterPress}
        >
          <Ionicons
            name="options"
            size={24}
            color={colors.foregroundSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
