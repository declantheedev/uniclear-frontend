import React from 'react';

const StatusContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clearance Status</h1>
        <p className="text-gray-600">Check the status of your clearance process.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <p>Your clearance status will be displayed here.</p>
      </div>
    </div>
  );
};

export default StatusContent;