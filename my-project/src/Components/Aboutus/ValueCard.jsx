import React from 'react';
import '../../Style/aboutus.css';
const ValueCard = ({ icon: Icon, title,className }) => {
  return (
    <div className={`flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 w-64 ${className}`}>
      <div className="text-[#4EB7AC] flex justify-center items-center w-12 h-12 rounded-full  bg-[#EAF5F4] mr-4">
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
  );
};

export default ValueCard;
