import React from 'react';
import Profile from '../components/Profile';

const ProfileContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-600">Manage your profile information.</p>
      </div>
      
      <Profile />
    </div>
  );
};

export default ProfileContent;