import { ThemeColors, useThemeColors } from '@/hooks/useThemeColors';
import { UserExercise, useUserExercises } from '@/hooks/useUserExercises';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const colors: ThemeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();
  const router = useRouter();

  const { exercises, isLoading } = useUserExercises();

  console.log('Is loading:', isLoading);
  console.log('Exercises from DB:', exercises.length, exercises);

  const filteredExercises = useMemo(() => {
    if (!searchText) return exercises;
    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [exercises, searchText]);

  console.log('Filtered List:', filteredExercises.length);

  const renderItem: ListRenderItem<UserExercise> = ({
    item,
  }: {
    item: UserExercise;
  }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center bg-background-muted p-4 mb-3 rounded-xl shadow-sm"
      onPress={() => router.push(`/details/${item.name}`)}
    >
      <View>
        <Text className="text-base font-semibold text-foreground-secondary">
          {item.name}
        </Text>
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
      <View
        className="flex-row px-4 pb-4 items-center bg-background border border-border"
        style={{ paddingTop: insets.top + 12 }}
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
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={colors.foregroundMuted}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.foregroundMuted}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          className="w-11 h-11 bg-background-secondary rounded-lg justify-center items-center border border-border"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons
            name="options"
            size={24}
            color={colors.foregroundSecondary}
          />
        </TouchableOpacity>
      </View>
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
      <View
        className="absolute bottom-0 left-0 right-0 justify-center items-center"
        pointerEvents="box-none"
        style={{ paddingBottom: insets.bottom + 20 }}
      >
        <TouchableOpacity
          className="bg-background px-8 py-4 rounded-full shadow-lg flex-row items-center"
          onPress={() => console.log('Add action triggered')}
        >
          <Text className="text-foreground text-lg font-bold tracking-wide">
            Add +
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
