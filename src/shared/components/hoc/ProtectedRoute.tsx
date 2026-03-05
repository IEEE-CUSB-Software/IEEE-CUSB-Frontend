import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/hooks';
import { RoleName } from '@/shared/types/auth.types';
import { UnauthorizedPage } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import { useCurrentUser } from '@/shared/queries/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: RoleName[];
}

/**
 * ProtectedRoute Component
 * Protects routes that require authentication and specific roles.
 * Shows a loading state while user data is being fetched.
 */
export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading } = useCurrentUser();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Still loading user data — show loading indicator
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Authenticated but checking role requirements
  if (requiredRoles) {
    const hasRequiredRole = requiredRoles.includes(user.role.name);

    if (!hasRequiredRole) {
      // User doesn't have required role - show unauthorized page
      return (
        <UnauthorizedPage
          onLogin={() => navigate('/login')}
          darkMode={isDark}
          className="absolute inset-0 min-h-full"
        />
      );
    }
  }

  // User is authenticated and has required role (or no role requirement)
  return <>{children}</>;
};
