import { useThemeColors } from '@/hooks/useThemeColors';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FilterDrawerContent(props: any) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <View
        className="p-6 border-b border-border bg-background-secondary mb-2"
        style={{ paddingTop: insets.top }}
      >
        <Text className="text-2xl font-bold text-foreground">Filters</Text>
        <Text className="text-sm text-foreground-muted mt-1">
          Refine your search results
        </Text>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      ></DrawerContentScrollView>
      <View
        className="p-4 border-t border-border"
        style={{ paddingBottom: insets.bottom }}
      >
        <DrawerItem
          label="Apply Filters"
          style={{ backgroundColor: colors.primary, borderRadius: 12 }}
          labelStyle={{
            color: colors.primaryForeground,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          onPress={() => props.navigation.closeDrawer()}
        />
      </View>
    </View>
  );
}
