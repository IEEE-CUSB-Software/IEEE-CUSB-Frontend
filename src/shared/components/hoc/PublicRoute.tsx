import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/hooks';
import { useCurrentUser } from '@/shared/queries/auth';

/**
 * PublicRoute Component
 * Redirects authenticated users to the home page (or dashboard)
 * preventing them from accessing public-only routes like Login/Register.
 * Shows nothing while auth state is being determined.
 */
export const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { isLoading } = useCurrentUser();

  // While loading, don't redirect — wait for auth check
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
