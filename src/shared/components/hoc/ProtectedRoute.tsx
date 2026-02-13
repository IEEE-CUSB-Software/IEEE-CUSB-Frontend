import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/hooks';
import { RoleName } from '@/shared/types/auth.types';
import { UnauthorizedPage } from '@ieee-ui/ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: RoleName[];
}

/**
 * ProtectedRoute Component
 * Protects routes that require authentication and specific roles
 */
export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but checking role requirements
  if (requiredRoles && user) {
    const hasRequiredRole = requiredRoles.includes(user.role.name);

    if (!hasRequiredRole) {
      // User doesn't have required role - show unauthorized page
      return <UnauthorizedPage onLogin={() => navigate('/login')} />;
    }
  }

  // User is authenticated and has required role (or no role requirement)
  return <>{children}</>;
};
