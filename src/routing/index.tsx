import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from '../shared/components/hoc/Layout';
import { HomePage, NotFoundPage } from './pages';
import EventsPage from './pages/EventsPage';

/**
 * Application Routes Configuration
 * Using React Router v6 Data APIs (createBrowserRouter)
 */

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path:'/events',
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
