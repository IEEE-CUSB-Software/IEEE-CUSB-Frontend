import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage, NotFoundPage } from './pages';

/**
 * Application Routes Configuration
 * Using React Router v6 Data APIs (createBrowserRouter)
 */

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <div className="p-10 text-red-500">
        <h1>Application Error</h1>
        <p>Check console for details.</p>
      </div>
    ),
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
