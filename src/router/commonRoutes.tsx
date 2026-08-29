import type { RouteObject } from 'react-router-dom';

import { HomePage } from '@/pages';

export const commonRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];