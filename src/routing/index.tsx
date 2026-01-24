import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { Layout } from './components/Layout';
import {
  HomePage,
  AboutPage,
  DashboardPage,
  ProfilePage,
  NotFoundPage,
  UIDemoPage,
  ButtonsDemoPage,
  DatePickerDemoPage,
  PageWrapperDemoPage,
} from './pages';

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
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.UI_DEMO,
        element: <UIDemoPage />,
        children: [
          {
            path: ROUTES.UI_DEMO_BUTTONS,
            element: <ButtonsDemoPage />,
          },
          {
            path: ROUTES.UI_DEMO_DATEPICKER,
            element: <DatePickerDemoPage />,
          },
          {
            path: ROUTES.UI_DEMO_PAGEWRAPPER,
            element: <PageWrapperDemoPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
