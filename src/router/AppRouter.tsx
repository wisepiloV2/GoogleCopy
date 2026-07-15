import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

const ErrorPage = () => <h1>¡Ups! Esa página no existe. (Error 404)</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />, 
    errorElement: <ErrorPage />,
    children: [
      { 
        path: "/", 
        element: <HomePage /> 
      }
    ],
  },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};