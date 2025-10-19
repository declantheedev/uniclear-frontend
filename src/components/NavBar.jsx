import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, UserCircle, Settings, LogOut } from 'lucide-react';
import NotificationBar from './NotificationBar';
import NotificationList from './NotificationList';

const NavBar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  // Handle clicks outside of dropdown menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu for Mobile */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-custom"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            <img src="/Uniclearlogo.png" alt="Uniclear logo" className="h-8 w-auto" />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4 relative">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
                <NotificationBar toggleNotification={toggleNotifications} showNotification={showNotifications} />
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-30 border border-gray-200 animate-fadeIn">
                  <NotificationList />
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-custom"
                aria-label="Toggle profile menu"
              >
                <User className="w-6 h-6" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200 animate-fadeIn">
                  <Link
                    to="profile/"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <UserCircle className="w-4 h-4 mr-2 text-gray-500" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                    to="/logout"
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2 text-red-500" />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;