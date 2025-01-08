import React from "react";
import {
  RiAdminLine,
  RiBuilding2Line,
  RiUser3Line,
  RiPlaneLine,
  RiFileList2Line,
  RiNotification3Line,
  RiHomeLine,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const SideMenu = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-[#D6EBE9] flex flex-col p-4 fixed top-0 left-0">
      <div className="space-y-4">
        {/* Admin Icon */}
        <div className="flex items-center justify-center mx-auto rounded-full w-20 h-20 border border-2 border-[#4eb7ac] bg-white mb-8">
          <RiAdminLine className="h-12 w-12 text-[#4eb7ac]" />
        </div>
        <div className="text-xl font-bold text-[#4eb7ac]">Admin Panel</div>
        {/* Menu Items */}
        <div
          className={`px-2 py-2 flex items-center space-x-4 rounded-lg text-black ${
            location.pathname === "/admin/dashboard"
              ? "bg-[#4eb7ac] text-white"
              : "hover:bg-gray-100 text-[#4eb7ac]"
          }`}
        >
          <RiHomeLine className="h-6 w-6" />
          <Link to="/admin/dashboard">Dashboard</Link>
        </div>
        <div
          className={`px-2 py-2 flex items-center space-x-4 rounded-lg text-black ${
            location.pathname === "/admin/all-agencies"
              ? "bg-[#4eb7ac] text-white"
              : "hover:bg-gray-100 text-[#4eb7ac]"
          }`}
        >
          <RiBuilding2Line className="h-6 w-6" />
          <Link to="/admin/all-agencies">Agencies Accounts</Link>
        </div>
        <div
          className={`px-4 py-2 flex items-center space-x-4 rounded-lg text-black ${
            location.pathname === "/admin/user-accounts"
              ? "bg-[#4eb7ac] text-white"
              : "hover:bg-gray-100 text-[#4eb7ac]"
          }`}
        >
          <RiUser3Line className="h-6 w-6" />
          <Link to="/admin/user-accounts">User Accounts</Link>
        </div>
        <div
          className={`px-4 py-2 flex items-center space-x-4 rounded-lg text-black ${
            location.pathname === "/admin/offers"
              ? "bg-[#4eb7ac] text-white"
              : "hover:bg-gray-100 text-[#4eb7ac]"
          }`}
        >
          <RiPlaneLine className="h-6 w-6 transform rotate-45" />
          <Link to="/admin/offers">Offers</Link>
        </div>
        <div
          className={`px-4 py-2 flex items-center space-x-4 rounded-lg text-black ${
            location.pathname === "/admin/bookings"
              ? "bg-[#4eb7ac] text-white"
              : "hover:bg-gray-100 text-[#4eb7ac]"
          }`}
        >
          <RiFileList2Line className="h-6 w-6" />
          <Link to="/admin/bookings">Bookings</Link>
        </div>
        <div
          className={`px-4 py-2 flex items-center space-x-4 rounded-lg text-black ${
            location.pathname === "/admin/notifications"
              ? "bg-[#4eb7ac] text-white"
              : "hover:bg-gray-100 text-[#4eb7ac]"
          }`}
        >
          <RiNotification3Line className="h-6 w-6" />
          <Link to="/admin/notifications">Notifications</Link>
        </div>
        <div
          className={`px-4 py-2 flex items-center space-x-4 rounded-lg text-black ${
            location.pathname === "/admin/reviews"
              ? "bg-[#4eb7ac] text-white"
              : "hover:bg-gray-100 text-[#4eb7ac]"
          }`}
        >
          <RiFileList2Line className="h-6 w-6" />
          <Link to="/admin/reviews">Site Reviews</Link>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
