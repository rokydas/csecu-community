import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../App';

const PrivateRoute = ({ 
    isAdmin = true,
    children
}) => {

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    if (!loggedInUser?.email) {
        return <Navigate to="/login" replace />;
    }
    if(!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
}

export default PrivateRoute;