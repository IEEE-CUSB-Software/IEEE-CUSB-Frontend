import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/hooks';

/**
 * PublicRoute Component
 * Redirects authenticated users to the home page (or dashboard)
 * preventing them from accessing public-only routes like Login/Register
 */
export const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
