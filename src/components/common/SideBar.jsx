import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SideBar = ({ navigationItems = [] }) => {
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

  // When collapsed we render a minimal column that only shows the toggle button
  if (collapsed) {
    return (
      <aside className="w-12 sticky top-0 min-h-screen bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 text-white flex items-start justify-center transition-all duration-200" aria-label="Collapsed sidebar">
        <div className="w-full flex justify-center pt-3">
          <button
            onClick={toggle}
            aria-expanded={!collapsed}
            aria-label="Expand sidebar"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 shadow-sm"
            title="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`w-64 sticky top-0 min-h-screen bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 text-white p-4 flex flex-col justify-between transition-all duration-200`}
      aria-label="Main sidebar"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold">UC</div>
            <div className="text-sm opacity-90">Uniclear</div>
          </div>
          <button
            onClick={toggle}
            aria-expanded={!collapsed}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 shadow-sm"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === ''}
                title={item.label}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full p-2 rounded-md transition-colors duration-150 ${isActive ? 'bg-white/20' : 'hover:bg-white/5'}`
                }
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10">
                  {IconComponent ? <IconComponent className="w-5 h-5" /> : null}
                </div>
                <span className="text-lg">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-4">
        <button className="w-full flex items-center gap-3 p-2 rounded-md bg-white/5 hover:bg-white/10">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">👤</div>
          <div className="text-sm">Mr. Alex Ben</div>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
