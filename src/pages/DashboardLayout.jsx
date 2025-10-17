import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        {/* Desktop Sidebar - always visible on large screens */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <SideBar />
        </div>
        
        {/* Mobile Sidebar - slide-out drawer */}
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs lg:hidden">
              <SideBar onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}
        
        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6">
          {/* This is where the nested routes will be rendered */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;