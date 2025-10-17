import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, FileText, Check, MessageSquare, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Icon = ({ children }) => (
  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white">
    {children}
  </div>
);

const SideBar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className="w-56 min-h-screen p-6 text-white flex flex-col justify-between"
      style={{ backgroundColor: 'var(--color-primary)' }}
      aria-label="Main sidebar"
    >
      <div>
        <h1 className="text-2xl font-bold mb-8 text-center">Dashboard</h1>

        <nav className="space-y-6">
          <NavLink 
            to="" 
            end
            className={({ isActive }) => 
              `flex items-center gap-3 w-full ${isActive ? 'bg-white/20 rounded-md p-2' : ''}`
            }
          >
            <Icon>
              <User className="w-5 h-5" />
            </Icon>
            <span className="text-lg">My Profile</span>
          </NavLink>

          <NavLink 
            to="documents" 
            className={({ isActive }) => 
              `flex items-center gap-3 w-full ${isActive ? 'bg-white/20 rounded-md p-2' : ''}`
            }
          >
            <Icon>
              <FileText className="w-5 h-5" />
            </Icon>
            <span className="text-lg">My Documents</span>
          </NavLink>

          <NavLink 
            to="status" 
            className={({ isActive }) => 
              `flex items-center gap-3 w-full ${isActive ? 'bg-white/20 rounded-md p-2' : ''}`
            }
          >
            <Icon>
              <Check className="w-5 h-5" />
            </Icon>
            <span className="text-lg">Status</span>
          </NavLink>

          <NavLink 
            to="messages" 
            className={({ isActive }) => 
              `flex items-center gap-3 w-full ${isActive ? 'bg-white/20 rounded-md p-2' : ''}`
            }
          >
            <Icon>
              <MessageSquare className="w-5 h-5" />
            </Icon>
            <span className="text-lg">Messages</span>
          </NavLink>

          <NavLink 
            to="new" 
            className={({ isActive }) => 
              `flex items-center gap-3 w-full ${isActive ? 'bg-white/20 rounded-md p-2' : ''}`
            }
          >
            <Icon>
              <Plus className="w-5 h-5" />
            </Icon>
            <span className="text-lg">New</span>
          </NavLink>
        </nav>
      </div>

      <div className="mt-8">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm opacity-90 bg-transparent border-none text-white cursor-pointer"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4 ml-2" />
        </button>
      </div>
    </aside>
  );
};

export default SideBar;