import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { role } = useAuth();

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;