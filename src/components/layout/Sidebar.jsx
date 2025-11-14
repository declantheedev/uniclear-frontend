import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sidebarLinks } from '../../config/sidebarLinks';

const Sidebar = () => {
  const { role } = useAuth();
  const links = sidebarLinks[role] || [];

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebarCollapsed') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sidebarCollapsed', collapsed);
    } catch (e) {
      // ignore
    }
  }, [collapsed]);

  const toggle = () => setCollapsed((s) => !s);

  // When collapsed show only the toggle button centered vertically
  if (collapsed) {
    return (
      <div className="w-12 bg-gray-800 text-white sticky top-0 min-h-screen flex items-start justify-center transition-all duration-200">
        <div className="w-full flex justify-center pt-3">
          <button onClick={toggle} aria-label="Expand sidebar" className="p-2 rounded-full bg-white/5 hover:bg-white/10 shadow-sm" title="Expand sidebar">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-64 bg-gray-800 text-white sticky top-0 min-h-screen p-4 transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold`}>Dashboard</h2>
        <button onClick={toggle} className="ml-2 p-1 rounded-full bg-white/5 hover:bg-white/10 shadow-sm" title="Collapse sidebar">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                title={link.label}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded transition duration-200 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
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