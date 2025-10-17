import React from 'react';
import { Link } from 'react-router-dom';

const LandingNav = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo and brand */}
        <div className="flex items-center gap-2">
          <img src="/Uniclearlogo.png" alt="Uniclear logo" className="h-8 w-auto" />
        </div>

        {/* Navigation links - hidden on mobile, visible on md and up */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          <a href="#features" className="text-primary-custom hover:underline">Features</a>
          <a href="#how-it-works" className="text-primary-custom hover:underline">How it works</a>
          <a href="#support" className="text-primary-custom hover:underline">Support</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="px-3 py-1 sm:px-4 sm:py-1 border-2 border-primary-custom rounded-md text-primary-custom font-semibold bg-white hover:bg-primary-custom hover:text-white transition-colors text-sm sm:text-base">Login</Link>
          <Link to="/signup" className="px-3 py-1 sm:px-4 sm:py-1 rounded-md bg-primary-custom text-white font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">Get started</Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNav;