import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const userRole = useSelector((state) => state.user.role);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
