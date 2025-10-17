// ... existing code ...
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CleranceOption = () => {
  const navigate = useNavigate();

  const handleClearanceSelect = (type) => {
    // Navigate to the appropriate route based on clearance type
    switch(type) {
      case 'departmental':
        navigate('/department-clearance');
        break;
      case 'physical':
        navigate('/physical-clearance');
        break;
      case 'faculty':
        navigate('/faculty-clearance');
        break;
      case 'sug':
        navigate('/sug-clearance');
        break;
      case 'library':
        navigate('/library-clearance');
        break;
      default:
        console.error('Invalid clearance type');
    }
  };

  return (
    <div className="min-h-screen bg-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pick A Clearance</h2>
        
        <div className="space-y-3">
          <button
            onClick={() => handleClearanceSelect('departmental')}
            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            1. Departmental
          </button>
          
          <button
            onClick={() => handleClearanceSelect('physical')}
            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            2. Physical
          </button>
          
          <button
            onClick={() => handleClearanceSelect('faculty')}
            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            3. Faculty
          </button>
          
          <button
            onClick={() => handleClearanceSelect('sug')}
            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            4. SUG
          </button>
          
          <button
            onClick={() => handleClearanceSelect('library')}
            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            5. Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default CleranceOption;