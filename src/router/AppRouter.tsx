import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginForm, RegisterForm, ForgotEmail, ForgotPassword } from '../features/auth';
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
        path: "/", 
        element: <HomePage /> 
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/register",
        element: <RegisterForm />
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/forgot-email",
        element: <ForgotEmail />
      }
    ],
  },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};