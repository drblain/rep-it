import { ThemeColors, useThemeColors } from '@/hooks/useThemeColors';
import { UserExercise, useUserExercises } from '@/hooks/useUserExercises';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ExerciseListItem from '@/components/ExerciseListItem';
import FloatingActionButton from '@/components/FloatingActionButton';
import SearchBar from '@/components/SearchBar';
import { useFilters } from '@/context/FilterContext';

export default function Index() {
  const colors: ThemeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const defaultFilter = (exercise: UserExercise, text: string) => {
    if (!text) return true;

    const lowerText = text.toLowerCase();
    return (
      exercise.name.toLowerCase().includes(lowerText) ||
      exercise.muscle_group.toLowerCase().includes(lowerText) ||
      exercise.target_muscle.toLowerCase().includes(lowerText)
    );
  };

  const { activeFilters } = useFilters();

  const navigation = useNavigation();

  // TODO, use an actual non-guest user
  const { exercises, isLoading } = useUserExercises(1);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      if (!defaultFilter(exercise, searchText)) return false;

      for (let i = 0; i < activeFilters.length; ++i) {
        if (!activeFilters[i](exercise)) return false;
      }

      return true;
    });
  }, [exercises, searchText]);

  const renderItem: ListRenderItem<UserExercise> = ({
    item,
  }: {
    item: UserExercise;
  }) => <ExerciseListItem item={item} />;

  if (isLoading) {
    return (
      <View className="flex-1 bg-background-secondary justify-center items-center">
        <ActivityIndicator size="large" color={colors.foreground} />
        <Text className="text-foreground-secondary mt-4">
          Loading exercises...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background-secondary"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SearchBar
        value={searchText}
        style={{ paddingTop: insets.top + 12 }}
        onChangeText={setSearchText}
        onFilterPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <FlatList
        data={filteredExercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-1 bg-background-secondary"
        contentContainerStyle={{
          paddingBottom: 100 + insets.bottom,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        keyboardDismissMode="on-drag"
      />
      <FloatingActionButton
        text="Add +"
        style={{ paddingBottom: insets.bottom + 20 }}
        action={() => console.log('Add action triggered')}
      />
    </KeyboardAvoidingView>
  );
}
