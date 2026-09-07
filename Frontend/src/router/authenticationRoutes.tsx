import type { RouteObject } from 'react-router-dom';
import { LoginPage, RegisterPage } from '@/pages';
import { GuestRoute } from './GuestRoute';

export const authenticationRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <GuestRoute />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
];