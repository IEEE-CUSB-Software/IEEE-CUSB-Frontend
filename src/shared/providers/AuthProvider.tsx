import { ReactNode, useEffect } from 'react';
import { useCurrentUser } from '@/shared/queries/auth';
import { useAppDispatch } from '@/shared/store/hooks';
import { clearAuth } from '@/shared/store/slices/authSlice';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Restores user session on app load
 * Fetches the current user if there's a valid token in localStorage
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const { isError } = useCurrentUser();

  // If fetching user fails (invalid/expired token), clear auth
  useEffect(() => {
    if (isError) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      dispatch(clearAuth());
    }
  }, [isError, dispatch]);

  return <>{children}</>;
};
