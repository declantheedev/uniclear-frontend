import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeptPop = ({
  isOpen = true,
  onClose = () => {},
  title = 'Pick A Clearance',
  options = ['Departmental', 'Physical', 'Faculty', 'SUG', 'Library'],
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // When an option is selected, navigate to the corresponding route and close the popup.
  const handleOptionClick = (opt) => {
    const path = `/dashboard/${opt.toLowerCase()}`;
    navigate(path);
    onClose(); // Close the popup after navigation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-primary-custom text-white rounded-md p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>

          <div className="space-y-4">
            {options.map((opt, idx) => (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className={`w-full text-left bg-white text-gray-900 py-4 px-6 rounded-lg shadow flex items-center gap-4 hover:shadow-md transition-shadow ${
                  idx === 0 ? 'ring-2 ring-white/40' : ''
                }`}
              >
                <span className="text-lg font-medium">
                  {idx + 1}. {opt}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptPop;