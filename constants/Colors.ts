import palette from './palette';

// This allows you to do: Colors[theme].text
export const Colors = {
  light: {
    text: palette.black,
    background: palette.white,
    tint: palette.primary,
    tabIconDefault: palette.gray800,
    tabIconSelected: palette.primary,
  },
  dark: {
    text: palette.white,
    background: palette.zinc900,
    tint: palette.white,
    tabIconDefault: palette.gray100,
    tabIconSelected: palette.white,
  },
};
