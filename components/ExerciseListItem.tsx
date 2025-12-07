import { useThemeColors } from '@/hooks/useThemeColors';
import { UserExercise } from '@/hooks/useUserExercises';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface ExerciseListItemProps {
  item: UserExercise;
}

export default function ExerciseListItem({ item }: ExerciseListItemProps) {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-row justify-between items-center bg-background-muted p-4 mb-3 rounded-xl shadow-sm"
      onPress={() => router.push(`/details/${item.name}`)}
    >
      <View>
        <View className="flex-row gap-2 items-center">
          <Text className="text-base font-semibold text-foreground-secondary">
            {item.name}
          </Text>
          {item.is_favorite && (
            <Ionicons name="star" size={15} color={colors.primary} />
          )}
        </View>
        <Text className="text-sm mt-1 text-foreground-secondary">
          {item.muscle_group} - {item.target_muscle}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.foregroundMuted}
      />
    </TouchableOpacity>
  );
}
