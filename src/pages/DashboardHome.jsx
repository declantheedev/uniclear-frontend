import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const DashboardHome = () => {
  const { user, loading } = useUser();
  const { isAuthenticated, fetchUserData, accessToken } = useAuth();
  const [error, setError] = useState(null);

  // Fetch user data when component mounts and user is authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated && accessToken && !user) {
        try {
          console.log('DashboardHome: Fetching user data');
          await fetchUserData(accessToken);
        } catch (err) {
          console.error('DashboardHome: Error fetching user data:', err);
          setError('Failed to load user data. Please try refreshing the page.');
        }
      }
    };
    
    loadUserData();
  }, [isAuthenticated, accessToken, user, fetchUserData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-custom"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary-custom text-white rounded-md"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Loading Profile Data</h2>
        <p>Please wait while we load your profile information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.first_name} {user.last_name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user.first_name} {user.last_name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Registration Number:</span> {user.matric_number}</p>
            <p><span className="font-medium">Level:</span> {user.level}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">School:</span> {user.school?.full_name || 'Not specified'}</p>
            <p><span className="font-medium">Faculty:</span> {user.faculty?.full_name || 'Not specified'}</p>
            <p><span className="font-medium">Department:</span> {user.department?.full_name || 'Not specified'}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Clearance Status</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Status:</span> {user.clearance_status || 'Pending'}</p>
            <p><span className="font-medium">Progress:</span> {user.clearance_progress || '0'}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;