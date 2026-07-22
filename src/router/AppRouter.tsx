import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ForgotEmailPage } from '../pages/ForgotEmailPage';
import {ErrorPage} from '../pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />, 
    errorElement: 
      <ErrorPage 
        title='Error 404. Pagina no encontrada' 
        subtitle='La pagina que buscas no existe.'
      />,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />
      },
      {
        path: "/forgot-email",
        element: <ForgotEmailPage />
      }
    ],
  },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};