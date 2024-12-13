import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // FontAwesome icons

export default function Pagination({ currentPage, totalPages, onPageChange, onNext, onPrevious }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center mt-6 space-x-4">
      {/* Previous Button with Icon */}
      <button
        className={`flex items-center justify-center px-4 py-2 border-2 border-[#4EB7AC]  ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''} bg-white`}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <FaChevronLeft className="text-[#4EB7AC] " />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`px-4 py-2 mx-1 text-[#4EB7AC]  ${currentPage === number ? 'bg-[#4EB7AC]  text-white rounded-full' : 'bg-white'}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Next Button with Icon */}
      <button
        className={`flex items-center justify-center px-4 py-2 border-2 border-[#4EB7AC]  ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''} bg-white`}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight className="text-[#4EB7AC] " />
      </button>
    </div>
  );
}
