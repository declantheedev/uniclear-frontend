import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-custom"></div>
      </div>
    );
  }

  // If authenticated, render children, otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;