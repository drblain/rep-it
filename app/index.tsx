import { ThemeColors, useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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

// This should be where the search screen is displayed

interface ResultItem {
  id: string;
  title: string;
  subtitle: string;
}

const TMP_RESULTS: ResultItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: i.toString(),
  title: `Result Item ${i + 1}`,
  subtitle: `Tap to navigate`,
}));

export default function Index() {
  const colors: ThemeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const renderItem: ListRenderItem<ResultItem> = ({
    item,
  }: {
    item: ResultItem;
  }) => (
    <TouchableOpacity
      // Don't use border border-border on shadowed cards
      className="flex-row justify-between items-center bg-card p-4 mb-3 rounded-xl shadow-sm"
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <View>
        <Text className="text-base font-semibold text-foreground-secondary">
          {item.title}
        </Text>
        <Text className="text-sm mt-1 text-foreground-secondary">
          {item.subtitle}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.foregroundMuted}
      />
    </TouchableOpacity>
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
            className="flex-1 text-base text-foreground h-full"
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={colors.foregroundMuted}
          />
        </View>
        <TouchableOpacity
          className="w-11 h-11 bg-background-secondary rounded-lg justify-center items-center border border-border"
          onPress={() => Alert.alert('Context Menu', 'Filter options')}
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
