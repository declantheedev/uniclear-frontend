import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, User, FileText, Check, MessageSquare, Plus, LogOut, X, Home } from 'lucide-react';
import { LogOut, X} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sidebarLinks } from '../../config/sidebarLinks';


const Icon = ({ children }) => (
  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white">
    {children}
  </div>
);

const Sidebar = ({ onClose }) => {
  const { role, logout } = useAuth();
  const links = sidebarLinks[role] || [];

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <aside
      className="h-100 p-10 text-white flex flex-col justify-between"
      style={{ backgroundColor: '#2600FF' }}
      aria-label="Main sidebar"
    >
      {/* Mobile Close Button */}
      {onClose && (
        <div className="flex justify-end lg:hidden mb-4">
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
      
      <div>
        <nav className="space-y-6">
          {links.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path}
              end={link.path === '' || link.path === '/'}
              className={({ isActive }) => 
                `flex items-center gap-3 w-full ${isActive ? 'bg-white/20 rounded-md p-2' : ''}`
              }
            >
              <Icon>
                {link.icon}
              </Icon>
              <span className="text-lg">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        <button 
          // onClick={handleLogout}
          className="flex items-center gap-3 text-sm opacity-90 bg-transparent border-none text-white cursor-pointer"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4 ml-2" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;