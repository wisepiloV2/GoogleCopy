import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

export const ProtectedRoute = () => {
    const { isLogged } = useAuth();
    if (!isLogged) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};