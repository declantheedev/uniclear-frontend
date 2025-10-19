import React, { useEffect } from 'react';
import InfoCard from '../components/InfoCard';
// import FeatureCard from '../components/FeatureCard';
import { Plus, Bell } from 'lucide-react';
// import Notification from '../components/NotificationBar';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import ProfileCard from '../components/ProfileCard';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const DashboardHome = () => {
  const { user, loading } = useUser();
  const { isAuthenticated, fetchUserData, accessToken } = useAuth();

  // Fetch user data when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken && !user) {
      fetchUserData(accessToken);
    }
  }, [isAuthenticated, accessToken, user, fetchUserData]);

    // Destructure the parts of the dashboard data
  // const profile = user?.profile;
  // const clearances = user?.clearances || [];
  // const documents = user?.documents || [];
  // const remainingRequirements = user?.remaining_requirements || [];
  // Debug: Log when component renders
  // useEffect(() => {
  //   console.log('Profile component rendered with:', { user, loading, isAuthenticated });
  // }, [user, loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="text-blue-500 animate-pulse" size={24} />
          <h1 className="text-xl font-semibold text-blue-600">Loading your dashboard...</h1>
        </div>
        <p className="text-sm text-gray-500">Fetching your profile and clearance information</p>
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
      {/* Header card */}
     <ProfileCard
        user={user}
        loading={loading}
        isAuthenticated={isAuthenticated}
        buttonText="Edit Profile"
        route="profile"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 

          <InfoCard icon={<Plus />} text={"Start Your clearance"} handleOnClick={() => {
            
          }} />
      </div>  
    </div>
  )}
    
export default DashboardHome;