import React from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProfileCard = ({ user, loading, isAuthenticated, buttonText, route }) => {
  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-custom"></div>
      </div>
    );
  }

  // Handle unauthenticated access
  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  // Handle missing user data
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">No Profile Data</h2>
        <p>Unable to load user information.</p>
      </div>
    );
  }

  const profile = user.profile;

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-custom">
            {profile.user.first_name} {profile.user.last_name}
          </h2>
          <div className="mt-2 text-gray-400 uppercase tracking-wide text-sm">
            REG NO: {profile.matric_number}
          </div>

          <div className="mt-6 flex justify-center">
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
              {profile.profile_picture ? (
                <img 
                  src={BASE_URL + profile.profile_picture} 
                  alt={`${profile.user.first_name} ${profile.user.last_name}`} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              className="px-6 py-2 rounded-md bg-primary-custom text-white"
              onClick={() => (window.location.href = `/dashboard/${route}`)}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
