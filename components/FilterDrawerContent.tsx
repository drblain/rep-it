import FilterItem from '@/components/FilterItem';
import { FilterId, useFilters } from '@/context/FilterContext';
import { FILTER_OPTIONS } from '@/context/exerciseFilters';
import { useThemeColors } from '@/hooks/useThemeColors';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FilterDrawerContentProps {
  drawerProps: any;
}

export default function FilterDrawerContent({
  drawerProps,
}: FilterDrawerContentProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { activeFilterIds, toggleFilter, clearFilters } = useFilters();

  const collectFilters: () => FilterId[] = () => {
    return [];
  };

  return (
    <View className="flex-1 bg-background">
      <View
        className="p-6 border-b border-border bg-background-secondary mb-2"
        style={{ paddingTop: insets.top + 10 }}
      >
        <Text className="text-2xl font-bold text-foreground">Filters</Text>
      </View>
      <DrawerContentScrollView
        {...drawerProps}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {FILTER_OPTIONS.map((section) => {
          <View key={section.label} className="mb-4">
            <Text className="font-bold text-lg px-4 mb-2">{section.label}</Text>
            {section.data.map((filter) => (
              <FilterItem
                key={filter.id}
                label={filter.label}
                isActive={activeFilterIds.includes(filter.id)}
                onPress={() => toggleFilter(filter.id)}
              />
            ))}
          </View>;
        })}
      </DrawerContentScrollView>
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
          onPress={() => {
            drawerProps.navigation.closeDrawer();
            collectFilters().forEach((filterId: FilterId) => {
              toggleFilter(filterId);
            });
          }}
        />
        {activeFilterIds.length > 0 && (
          <DrawerItem
            label="Clear Filters"
            style={{ backgroundColor: colors.primary, borderRadius: 12 }}
            labelStyle={{
              color: colors.primaryForeground,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            onPress={() => {
              drawerProps.navigation.closeDrawer();
              clearFilters();
            }}
          />
        )}
      </View>
    </View>
  );
}
