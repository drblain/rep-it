import { db } from '@/db/client';
import {
  exercise_muscles,
  exercises,
  muscle_groups,
  muscles,
} from '@/db/schema';
import { ThemeColors, useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import {
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

// We only need the information that we have to display in the ResultItem interface
interface ResultItem {
  id: string;
  name: string;
  muscle_group: string;
  target_muscle: string;
}

const TMP_RESULTS: ResultItem[] = [
  {
    id: '1',
    name: 'Push Up',
    muscle_group: 'Chest',
    target_muscle: 'Pectorals',
  },
  {
    id: '2',
    name: 'Squat',
    muscle_group: 'Legs',
    target_muscle: 'Quadriceps',
  },
  {
    id: '3',
    name: 'Pull Up',
    muscle_group: 'Back',
    target_muscle: 'Lats',
  },
  {
    id: '4',
    name: 'Bicep Curl',
    muscle_group: 'Arms',
    target_muscle: 'Biceps',
  },
  {
    id: '5',
    name: 'Tricep Dip',
    muscle_group: 'Arms',
    target_muscle: 'Triceps',
  },
  {
    id: '6',
    name: 'Lunge',
    muscle_group: 'Legs',
    target_muscle: 'Glutes',
  },
  {
    id: '7',
    name: 'Plank',
    muscle_group: 'Core',
    target_muscle: 'Abdominals',
  },
  {
    id: '8',
    name: 'Deadlift',
    muscle_group: 'Back',
    target_muscle: 'Hamstrings',
  },
  {
    id: '9',
    name: 'Bench Press',
    muscle_group: 'Chest',
    target_muscle: 'Pectorals',
  },
  {
    id: '10',
    name: 'Shoulder Press',
    muscle_group: 'Shoulders',
    target_muscle: 'Deltoids',
  },
];

export default function Index() {
  const colors: ThemeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();
  const router = useRouter();

  const renderItem: ListRenderItem<ResultItem> = ({
    item,
  }: {
    item: ResultItem;
  }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center bg-background-muted p-4 mb-3 rounded-xl shadow-sm"
      onPress={() => router.push(`/details/${item.name}`)}
    >
      <View>
        <Text
          // TODO: add more information here between title and subtitle to tell more about the exercise
          className="text-base font-semibold text-foreground-secondary"
        >
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

  const data = useLiveQuery(
    db
      .select({
        id: exercises.id,
        name: exercises.name,
        muscle_group: muscle_groups.name,
        target_muscle: muscles.name,
      })
      .from(exercises)
      .innerJoin(
        exercise_muscles,
        eq(exercises.id, exercise_muscles.exerciseId)
      )
      .innerJoin(muscles, eq(exercise_muscles.muscleId, muscles.id))
      .innerJoin(muscle_groups, eq(muscles.muscleGroupId, muscle_groups.id))
      .where(eq(exercise_muscles.role, 'primary'))
  );

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
            // TODO: this search input needs to be cleared when filters are applied
            // TODO: when the text input has any contents, there should be a clear (X) button on the right side
            className="flex-1 text-base text-foreground h-full"
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={colors.foregroundMuted}
          />
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
        data={TMP_RESULTS}
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
