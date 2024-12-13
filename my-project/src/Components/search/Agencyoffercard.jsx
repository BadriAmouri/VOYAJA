import React , { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa'; // Correct import for outlined heart icon
import { Link } from 'react-router-dom';


export default function Agencyoffercard({ agency_name , agency_logo , offer }) {
  const formattedDepartureDate = new Date(offer.starting_date).toLocaleDateString('en-GB').replace(/\//g, '-');
  const formattedRating = offer.average_rating.toFixed(1);
  return (
    <div className="text-left agencyoffer-card bg-white border p-4 rounded-lg shadow-md  max-w-[52rem]  flex">
      {/* Offer Image */}
      <div className="agencyoffer-image w-1/4">
        {offer.image && offer.image[0] ? (
          // Convert the BLOB to an object URL
          <img
            src={URL.createObjectURL(new Blob([offer.image[0]], { type: 'image/jpeg' }))}
            alt="Trip"
            className="w-full h-auto rounded-lg"
          />
        ) : (
          <div className="placeholder-image w-full h-auto rounded-lg bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}
      </div>

      {/* Offer Details */}
      <div className="agencyoffer-details pl-4 flex flex-col justify-between w-3/4">
        {/* Top Section: Rating, Reviews, and Price */}
        <div className="top-section flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="agencyofferrating border-2 border-[#4EB7AC] text-black px-2 py-1 rounded-lg">
              {formattedRating} ★
            </div>
            <span className="text-sm text-gray-600">({offer.review_count} reviews)</span>
          </div>
          <div className="agencyprice text-secondary text-xl font-semibold text-right">
          ${offer.min_price}
          </div>
        </div>

        {/* Title */}
        <h3 className="agencyoffer-title text-lg font-bold mt-2">{offer.offer_name}</h3>

        {/* Departure Date */}
        <p className="agencydeparture-date text-sm text-gray-600 mt-1">{formattedDepartureDate}</p>

        {/* Agency Logo and Name */}
       <div className="agency-info flex items-center mt-2 space-x-2">
       <Link to={`/agencyprofile/${offer.agency_id}`}>
            {agency_logo && agency_logo[0] ? (
              // Convert the BLOB to an object URL
              <img
                src={URL.createObjectURL(new Blob([agency_logo[0]], { type: 'image/png' }))}
                alt={agency_name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="placeholder-image w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                
              </div>
            )}
          </Link>
          <Link to={`/agencyprofile/${offer.agency_id}`}>
          <span className="text-sm text-gray-800 font-medium">{agency_name}</span>
          </Link>
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
          <Link to='/offerDetails'>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
}


