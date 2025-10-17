import React from 'react';

const DocumentsContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Documents</h1>
        <p className="text-gray-600">Manage your clearance documents.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Document Management</h2>
        <p>Your documents will be displayed here.</p>
      </div>
    </div>
  );
};

export default DocumentsContent;