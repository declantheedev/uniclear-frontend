import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6">
          {/* This is where the nested routes will be rendered */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;