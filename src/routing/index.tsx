import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from '../shared/components/hoc/Layout';
import { HomePage, NotFoundPage } from './pages';
import EventsPage from './pages/EventsPage';
import { AdminLayout } from '../features/admin/layouts/AdminLayout';
import { DashboardPage } from '../features/admin/pages/DashboardPage';
import { EventsPage as AdminEventsPage } from '../features/admin/pages/EventsPage';
import { WorkshopsPage } from '../features/admin/pages/WorkshopsPage';
import { PostsPage } from '../features/admin/pages/PostsPage';

/**
 * Application Routes Configuration
 * Using React Router v6 Data APIs (createBrowserRouter)
 */

const routes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'events',
        element: <AdminEventsPage />,
      },
      {
        path: 'workshops',
        element: <WorkshopsPage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/events',
        element: <EventsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
