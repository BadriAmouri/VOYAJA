import React from 'react';
import { FaPlane, FaHeart } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className="navbar bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left Section: Logo and Text */}
      <div className="flex items-center">
        <FaPlane className="text-[#4EB7AC] text-2xl" /> {/* Airplane Icon */}
        <span className="text-sm text-gray-600 ml-2">Find a Trip</span>
      </div>

      {/* Middle Section: Brand Name */}
      <div className="text-xl font-bold text-[#4EB7AC]">
        Voyaga
      </div>

      {/* Right Section: Favorites and Profile */}
      <div className="flex items-center space-x-6">
        {/* Favorites */}
        <div className="flex items-center text-gray-700 cursor-pointer">
          <FaHeart className="text-[#4EB7AC] text-lg" />
          <span className="ml-2 text-sm">Favorites</span>
        </div>

        {/* Profile Picture */}
        <div className="profile-pic w-10 h-10 rounded-full border-2 border-[#4EB7AC] overflow-hidden">
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
