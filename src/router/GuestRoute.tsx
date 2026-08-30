import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const GuestRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};