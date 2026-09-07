import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { SettingsPage } from '@/pages';

export const accountRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'account',
        children: [
          {
            path: 'settings',
            element: <SettingsPage />,
          },
        ],
      },
    ],
  }
];