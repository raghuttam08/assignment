'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white font-semibold text-lg">
          Dashboard
        </div>
        
        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/dashboard" className="text-white hover:text-indigo-200">
            Home
          </Link>
          <Link href="/profile" className="text-white hover:text-indigo-200">
            Profile
          </Link>
          <button className="text-white hover:text-indigo-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
