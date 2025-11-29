import { useColorScheme } from 'nativewind';

/**
 * These colors MUST match the values in your global.css.
 * We use this object for libraries that need raw string values
 * (like React Navigation headers, SVG icons, or charts)
 * where NativeWind classNames cannot be used.
 */
const COLORS = {
  light: {
    background: '#FFFFFF',
    backgroundSecondary: '#F8FAFC',
    backgroundMuted: '#F1F5F9',

    foreground: '#1E293B',
    foregroundSecondary: '#334155',
    foregroundMuted: '#64748B',

    card: '#FFFFFF',
    cardForeground: '#1E293B',

    border: '#E2E8F0',
    input: '#F1F5F9',
    ring: '#3B82F6',

    primary: '#3B82F6',
    primaryForeground: '#FFFFFF',

    secondary: '#F1F5F9',
    secondaryForeground: '#1E293B',

    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  dark: {
    background: '#0F172A',
    backgroundSecondary: '#1E293B',
    backgroundMuted: '#334155',

    foreground: '#F1F5F9',
    foregroundSecondary: '#E2E8F0',
    foregroundMuted: '#94A3B8',

    card: '#1E293B',
    cardForeground: '#F1F5F9',

    border: '#334155',
    input: '#334155',
    ring: '#60A5FA',

    primary: '#60A5FA',
    primaryForeground: '#1E293B',

    secondary: '#334155',
    secondaryForeground: '#F1F5F9',

    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
  },
} as const;

export function useThemeColors() {
  const { colorScheme } = useColorScheme();

  // Default to 'light' if the system state is undefined
  const currentTheme = colorScheme ?? 'light';

  return COLORS[currentTheme];
}

/**
 * Helper type to extract the structure of our theme
 * Usage: const colors: ThemeColors = useThemeColor();
 */
export type ThemeColors = { [K in keyof typeof COLORS.light]: string };
