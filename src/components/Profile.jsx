import React, { useEffect } from 'react';
import InfoCard from './InfoCard';
import FeatureCard from './FeatureCard';
import { Plus, Bell } from 'lucide-react';
import Notification from './NotificationBar';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useUser();
  const { isAuthenticated, fetchUserData, accessToken } = useAuth();

  // Fetch user data when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken && !user) {
      fetchUserData(accessToken);
    }
  }, [isAuthenticated, accessToken, user, fetchUserData]);

  // Debug: Log when component renders
  useEffect(() => {
    console.log('Profile component rendered with:', { user, loading, isAuthenticated });
  }, [user, loading, isAuthenticated]);

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
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-custom">
            {user.first_name} {user.last_name}
          </h2>
          <div className="mt-2 text-gray-400 uppercase tracking-wide text-sm">
            REG NO: {user.matric_number}
          </div>

          <div className="mt-6 flex justify-center">
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
              {user.profile_picture ? (
                <img 
                  src={user.profile_picture} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button className="px-6 py-2 rounded-md bg-primary-custom text-white">Proceed</button>
          </div>
        </div>
      </div>

      {/* User Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard 
          title="Email"
          value={user.email}
        />
        <InfoCard 
          title="Level"
          value={user.level}
        />
        <InfoCard 
          title="School"
          value={user.school?.full_name || 'Not specified'}
        />
        <InfoCard 
          title="Faculty"
          value={user.faculty?.full_name || 'Not specified'}
        />
        <InfoCard 
          title="Department"
          value={user.department?.full_name || 'Not specified'}
        />
      </div>
    </div>
  );
};



export default Profile;