import React from 'react';
import { NavLink } from 'react-router-dom';
// import { LogOut, X } from 'lucide-react';

const Icon = ({ children }) => (
  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white">
    {children}
  </div>
);

const SideBar = ({ navigationItems }) => {
  return (
    <aside
      className="h-full p-6 text-white flex flex-col justify-between"
    //   style={{ backgroundColor: 'var(--color-primary)' }}
      aria-label="Main sidebar"
    >
      
      <div>
        <nav className="space-y-6">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            
            return (
              <NavLink 
                key={item.id}
                to={item.path} 
                end={item.path === ''}
                className={({ isActive }) => 
                  `flex items-center gap-3 w-full ${isActive ? 'bg-white/20 rounded-md p-2' : ''}`
                }
              >
                <Icon>
                  <IconComponent className="w-5 h-5" />
                </Icon>
                <span className="text-lg">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* <div className="mt-8">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm opacity-90 bg-transparent border-none text-white cursor-pointer"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4 ml-2" />
        </button>
      </div> */}
    </aside>
  );
};

export default SideBar;
