import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { sidebarLinks } from '../../config/sidebarLinks';

const Sidebar = () => {
  const { role } = useAuth();
  const links = sidebarLinks[role] || [];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded transition duration-200 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;