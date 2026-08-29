import type { RouteObject } from 'react-router-dom';

import { LoginPage, RegisterPage } from '@/pages';

export const authenticationRoutes: RouteObject[] = [
  {
    path: 'auth',
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