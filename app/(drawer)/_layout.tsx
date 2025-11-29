import FilterDrawerContent from '@/components/FilterDrawerContent';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  const colors = useThemeColors();

  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={(props) => <FilterDrawerContent {...props} />}
        screenOptions={{
          drawerPosition: 'right',

          drawerType: 'front',

          headerShown: false,

          drawerStyle: {
            backgroundColor: colors.background,
            width: '85%',
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Search',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
