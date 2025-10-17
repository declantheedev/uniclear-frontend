import React from 'react';
import {User } from 'lucide-react';
import NotificationBar from './NotificationBar';
const NavBar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <img src="/Uniclearlogo.png" alt="Uniclear logo" className="h-8 w-auto" />
          </div>

          <div className="flex items-center gap-6">
          <NotificationBar />

            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
