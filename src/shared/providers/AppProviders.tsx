import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { store } from '@/shared/store';
import { queryClient } from './queryClient';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders component wraps the entire application with necessary providers
 * - Redux Provider for client/global state (UI state, preferences, etc.)
 * - React Query Provider for server state (API data, caching, etc.)
 * - AuthProvider for session restoration
 */
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </AuthProvider>
        {/* React Query Devtools - only shows in development */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ReduxProvider>
  );
};
