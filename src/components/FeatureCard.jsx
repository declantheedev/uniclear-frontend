import React from 'react';

const FeatureCard = ({ icon, title, use }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex gap-4 items-start">
      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{use}</p>
      </div>
    </div>
  );
};

export default FeatureCard;