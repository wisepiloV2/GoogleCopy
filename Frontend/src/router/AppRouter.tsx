import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { commonRoutes } from './commonRoutes';
import { authenticationRoutes } from './authenticationRoutes';
import { accountRoutes } from './accountRoutes';
import { ErrorPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      ...commonRoutes,
      ...authenticationRoutes,
      ...accountRoutes,
      {
        path: '*',
        element: <ErrorPage 
          title='Error 404. Pagina no encontrada' 
          subtitle='La pagina que buscas no existe.'
        />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}