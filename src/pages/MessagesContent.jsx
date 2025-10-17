import React from 'react';

const MessagesContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-600">Your messages and notifications.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Message Center</h2>
        <p>Your messages will be displayed here.</p>
      </div>
    </div>
  );
};

export default MessagesContent;