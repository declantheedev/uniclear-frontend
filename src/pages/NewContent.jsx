import React from 'react';

const NewContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Request</h1>
        <p className="text-gray-600">Start a new clearance request.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">New Clearance</h2>
        <p>Form for new clearance requests will be displayed here.</p>
      </div>
    </div>
  );
};

export default NewContent;