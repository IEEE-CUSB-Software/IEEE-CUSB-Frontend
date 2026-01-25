import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { HomePage, NotFoundPage } from './pages';

/**
 * Application Routes Configuration
 * Using React Router v6 Data APIs (createBrowserRouter)
 */

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
