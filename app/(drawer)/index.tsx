import { UserExercise } from '@/db/types';
import { ThemeColors, useThemeColors } from '@/hooks/useThemeColors';
import { useUserExercises } from '@/hooks/useUserExercises';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
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

  const { activeFilterIds } = useFilters();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 2. Debounce Search Input (Wait 300ms before querying DB)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const navigation = useNavigation();

  // TODO, use an actual non-guest user
  const { exercises, loadMore, isLoading } = useUserExercises(
    1,
    debouncedSearch,
    activeFilterIds
  );

  const renderItem: ListRenderItem<UserExercise> = ({
    item,
  }: {
    item: UserExercise;
  }) => <ExerciseListItem item={item} />;

  const renderFooter = () => {
    if (!isLoading || exercises.length === 0) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

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
      {isLoading && exercises.length === 0 ? (
        <View className="flex-1 bg-background-secondary justify-center items-center">
          <ActivityIndicator size="large" color={colors.foreground} />
          <Text className="text-foreground-secondary mt-4">
            Loading exercises...
          </Text>
        </View>
      ) : (
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          className="flex-1 bg-background-secondary"
          contentContainerStyle={{
            paddingBottom: 100 + insets.bottom,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
          keyboardDismissMode="on-drag"
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
      <FloatingActionButton
        text="Add +"
        style={{ paddingBottom: insets.bottom + 20 }}
        action={() => console.log('Add action triggered')}
      />
    </KeyboardAvoidingView>
  );
}
