import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Style/custom-datepicker.css";
import { RiSearch2Line } from "react-icons/ri";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    dates: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleDateChange = (date) => {
    setSearchParams({ ...searchParams, dates: date });
  };

  return (
    <div className="bg-beige shadow-lg rounded-lg p-4 space-y-4 w-full max-w-6xl mx-auto mt-4">
      <div className="flex items-center space-x-4">
        {/* Destination Input */}
        <div className="relative flex-1">
          <input
            type="text"
            name="destination"
            placeholder="Search for a destination"
            value={searchParams.destination}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4EB7AC] peer placeholder-gray-400"
          />
          <label
            htmlFor="destination"
            className="absolute left-4 top-[-8px] text-xs font-medium text-gray-500 bg-white px-1"
          >
            Destination
          </label>
        </div>

        {/* Date Picker */}
        <div className="relative flex-1">
  <DatePicker
    selected={searchParams.dates}
    onChange={handleDateChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4EB7AC] placeholder-gray-400"
    placeholderText="Select a date" // Custom placeholder
  />
  <label
    htmlFor="dates"
    className="absolute left-4 top-[-8px] text-xs font-medium text-gray-500 bg-white px-1"
  >
    Depart Date
  </label>
</div>

      
        {/* Search Button */}
        <button
          className="px-4 py-3 text-black bg-[#4EB7AC] rounded-md hover:bg-opacity-90 focus:ring-2 focus:ring-[#4EB7AC] focus:ring-offset-2 w-12 flex items-center justify-center"
          type="button"
        >
          <RiSearch2Line />
        </button>
      </div>
    </div>
  );
}
