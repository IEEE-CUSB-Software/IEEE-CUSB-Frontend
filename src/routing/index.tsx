import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from '../shared/components/hoc/Layout';
import { ProtectedRoute } from '../shared/components/hoc/ProtectedRoute';
import { PublicRoute } from '../shared/components/hoc/PublicRoute';
import {
  NotFoundPage,
  LoginPage,
  RegisterPage,
  UnderConstructionPage,
  EventDetailsPage,
  AboutUsPage,
} from './pages';
import EventsPage from './pages/EventsPage';
import { AdminLayout } from '../features/admin/layouts/AdminLayout';
import { EventsPage as AdminEventsPage } from './pages/admin/EventsPage';
import { RoleName } from '@/shared/types/auth.types';

/**
 * Application Routes Configuration
 * Using React Router v6 Data APIs (createBrowserRouter)
 */

const routes: RouteObject[] = [
  // Auth Routes (no layout)
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  // Admin Routes (Protected - requires Admin or Super Admin role)
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRoles={[RoleName.ADMIN, RoleName.SUPER_ADMIN]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UnderConstructionPage />, // Dashboard - Under Construction
      },
      {
        path: 'events',
        element: <AdminEventsPage />, // Events - Working
      },
      {
        path: 'workshops',
        element: <UnderConstructionPage />, // Workshops - Under Construction
      },
      {
        path: 'posts',
        element: <UnderConstructionPage />, // Posts - Under Construction
      },
      {
        path: 'locations',
        element: <UnderConstructionPage />, // Locations - Under Construction
      },
      {
        path: 'users',
        element: <UnderConstructionPage />, // Users - Under Construction
      },
      {
        path: 'statistics',
        element: <UnderConstructionPage />, // Statistics - Under Construction
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UnderConstructionPage />, // Home - Under Construction
      },
      {
        path: 'about',
        element: <AboutUsPage />, // About Us - Now Working!
      },
      {
        path: 'committees',
        element: <UnderConstructionPage />, // Committees - Under Construction
      },
      {
        path: 'events',
        element: <EventsPage />, // Events - Working
      },
      {
        path: 'events/:id',
        element: <EventDetailsPage />, // Event Details - Working
      },
      {
        path: 'workshops',
        element: <UnderConstructionPage />, // Workshops - Under Construction
      },
      {
        path: 'join',
        element: <UnderConstructionPage />, // Join Us - Under Construction
      },
      {
        path: 'profile',
        element: <UnderConstructionPage />, // Profile - Under Construction
      },
      {
        path: 'settings',
        element: <UnderConstructionPage />, // Settings - Under Construction
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
