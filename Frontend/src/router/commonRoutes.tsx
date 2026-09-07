import type { RouteObject } from 'react-router-dom';

import { HomePage, SearchPage } from '@/pages';

export const commonRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'search',
    element: <SearchPage />
  }
];