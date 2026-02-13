import { ReactNode } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component
 * Initializes the theme (light/dark) on app load and applies it to the document root.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // useTheme already handles application to document.documentElement and localStorage sync
  useTheme();

  return <>{children}</>;
};
