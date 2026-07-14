import { createBrowserRouter} from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
const ErrorPage = () => <h1>¡Ups! Esa página no existe. (Error 404)</h1>;

// 3. LA CONFIGURACIÓN DEL ENRUTADOR: La forma "moderna" recomendada
const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    errorElement: <ErrorPage />, // Esto atrapa cualquier error o ruta que no exista
    children: [
      { 
        path: "/", 
        element: <HomePage /> 
      }
    ],
  },
]);

export {router}