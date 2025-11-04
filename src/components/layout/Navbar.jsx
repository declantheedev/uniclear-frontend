import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { navbarConfig } from '../../config/navbarConfig';

const Navbar = () => {
  const { role } = useAuth();
  const { greeting } = navbarConfig[role] || { greeting: 'Welcome' };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{greeting}</h1>
      <div>
        {/* You can add other navbar items here, like a profile dropdown */}
      </div>
    </div>
  );
};

export default Navbar;