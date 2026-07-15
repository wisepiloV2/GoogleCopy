import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Login } from '../features/account';


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
      },
      {
        path: "/login",
        element: <Login />
      }
    ],
  },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};