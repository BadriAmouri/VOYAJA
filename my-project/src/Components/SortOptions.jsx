import React from 'react';
import "../Style/Searchpagestyle.css";
export default function SortOptions({ sortOption, setSortOption }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-3 max-w-[52rem]  mx-auto">
      <div className="comsortbtn flex justify-center space-x-20">
        {/* Cheapest */}
        <button
          className={`relative px-4 py-2 border-b-2 ${
            sortOption === 'Cheapest'
              ? 'border-[#4EB7AC] text-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
          onClick={() => setSortOption('Cheapest')}
        >
          Cheapest
        </button>

        {/* Best */}
        <button
          className={`relative px-4 py-2 border-b-2 ${
            sortOption === 'Best'
              ? 'border-[#4EB7AC] text-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
          onClick={() => setSortOption('Best')}
        >
          Best
        </button>

        {/* Quickest */}
        <button
          className={`relative px-4 py-2 border-b-2 ${
            sortOption === 'Quickest'
              ? 'border-[#4EB7AC] text-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
          onClick={() => setSortOption('Quickest')}
        >
          Quickest
        </button>
      </div>
    </div>
  );
}
