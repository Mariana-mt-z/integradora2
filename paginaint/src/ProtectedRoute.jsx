import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from './context/Auth.Context';

function ProtectedRoute() {
    const {loading,isAuth}=useAuth();

    if (loading) return <h1>Loading...</h1>;
    if (!isAuth && !loading) return <Navigate to="/login" replace />;
    return <Outlet />;
}

export default ProtectedRoute



