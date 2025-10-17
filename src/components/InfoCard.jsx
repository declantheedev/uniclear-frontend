import React from 'react';

const InfoCard = (props) => {
  // Check if this is being used as an info display card (with title/value) or as a button
  const isInfoDisplay = props.title && props.value;
  
  if (isInfoDisplay) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{props.title}</h3>
        <p className="text-gray-600">{props.value}</p>
      </div>
    );
  }
  
  // Original button implementation for backward compatibility
  return (
    <div className="max-w-xl mx-auto">
      <button
        className="w-full p-8 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors duration-200 flex flex-col items-center gap-4"
        aria-label="Start another clearance"
        onClick={props.handleOnClick}
      >
        <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
          {props.icon}
        </div>
        <span className="text-gray-500">{props.text}</span>
      </button>
    </div>
  );
};

export default InfoCard;