import React, { useEffect } from 'react';
import InfoCard from './InfoCard';
import FeatureCard from './FeatureCard';
// import { Plus, Bell } from 'lucide-react';
import Notification from './NotificationBar';
import { useUser } from '../context/UserContext';
import ProfileCard from './ProfileCard';
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
  // useEffect(() => {
  //   console.log('Profile component rendered with:', { user, loading, isAuthenticated });
  // }, [user, loading, isAuthenticated]);

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
   const profile = user?.profile;
  //  const clearances = user?.clearances || [];
  //  const documents = user?.documents || [];
  //  const remainingRequirements = user?.remaining_requirements || [];
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

      {/* User Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard 
          title="Email"
          value={profile.user.email || 'Not specified'}
        />
        <InfoCard 
          title="Level"
          value={profile.level || 'Not specified'}
        />
        <InfoCard 
          title="School"
          value={profile.school?.full_name || 'Not specified'}
        />
        <InfoCard 
          title="Faculty"
          value={profile.faculty?.full_name || 'Not specified'}
        />
        <InfoCard 
          title="Department"
          value={profile.department?.full_name || 'Not specified'}
        />
      </div>
    </div>
  );
};



export default Profile;