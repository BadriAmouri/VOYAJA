import React from 'react';
import { FaRegHeart } from 'react-icons/fa'; // Correct import for outlined heart icon

export default function Agencyoffercard({ offer }) {
  return (
    <div className="agencyoffer-card bg-white border p-4 rounded-lg shadow-md  max-w-[52rem]  flex">
      {/* Offer Image */}
      <div className="agencyoffer-image w-1/4">
        <img src={offer.image} alt="Trip" className="w-full h-auto rounded-lg" />
      </div>

      {/* Offer Details */}
      <div className="agencyoffer-details pl-4 flex flex-col justify-between w-3/4">
        {/* Top Section: Rating, Reviews, and Price */}
        <div className="top-section flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="agencyofferrating border-2 border-[#4EB7AC] text-black px-2 py-1 rounded-lg">
              {offer.rating} ★
            </div>
            <span className="text-sm text-gray-600">({offer.reviews} reviews)</span>
          </div>
          <div className="agencyprice text-xl font-semibold text-right">
            ${offer.price}
          </div>
        </div>

        {/* Title */}
        <h3 className="agencyoffer-title text-lg font-bold mt-2">{offer.title}</h3>

        {/* Departure Date */}
        <p className="agencydeparture-date text-sm text-gray-600 mt-1">{offer.departureDate}</p>

        {/* Agency Logo and Name */}
       <div className="agency-info flex items-center mt-2 space-x-2">
          <img
            src={offer.logo}
            alt={offer.agency}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-800 font-medium">{offer.agency}</span>
        </div>
 
        {/* Grey Line */}
        <hr className="my-2 border-gray-300" />

        {/* Buttons Section */}
        <div className="buttons flex">
          {/* Heart Button with Icon */}
          <button className="heart-button flex items-center justify-center w-10 h-10 mr-2 border-2 border-[#4EB7AC] bg-white text-[#4EB7AC] rounded-lg">
            <FaRegHeart /> {/* Heart icon */}
          </button>

          {/* View Details Button */}
          <button className="agencyview-details flex-1 bg-[#4EB7AC] text-white p-2 rounded-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
