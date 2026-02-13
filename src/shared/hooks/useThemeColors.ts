import { useTheme } from './useTheme';

export const useThemeColors = () => {
  const { isDark } = useTheme();

  return {
    primary: '#00629B', // IEEE Blue
    secondary: '#FDB515', // IEEE Gold
    mutedPrimary: '#82a9be',
    background: isDark ? '#1f2937' : '#ffffff',
    contrast: isDark ? '#ffffff' : '#111827',
  };
};
