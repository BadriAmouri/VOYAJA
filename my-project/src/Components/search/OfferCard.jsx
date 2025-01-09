import React from "react";
import seoulTower from "../../assets/offerPics/seoul-tower.jpg";
import seoulPalace from "../../assets/offerPics/palace.jpg";
import springSeoul from "../../assets/offerPics/spring-seoul-korea.jpg";
import travelLogo from "../../assets/offerPics/travel-agency-logo.jpg";
import { FaRegHeart } from "react-icons/fa"; // Correct import for outlined heart icon
import { Link } from "react-router-dom";
import HeartButton from "../Favorite/Heartbtn";
import { useAppContext } from "../../contexts/AppContext";

export default function OfferCard({ offer }) {
  //const userID=18;
  const {isLoggedIn, setIsLoggedIn ,clientID ,setClientID} = useAppContext();
  
  // Format departure date (only show date part)
  const formattedDepartureDate = new Date(offer.starting_date)
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");

  // Format rating (only one decimal place)
  const formattedRating = offer.averageRating.toFixed(1);
  {console.log(offer)}
  return (
    <div className="text-left boffer-card bg-white border p-4 rounded-lg shadow-md  max-w-[52rem]  flex">
      {/* Offer Image */}
      <div className="boffer-image w-1/4">
        {offer.pictures && offer.pictures.length > 0 ? (
          <img
            src={offer.pictures[1]} // Get the first image from the array
            alt="Trip"
            className="w-full h-auto rounded-lg"
          />
        ) : (
          <div className="placeholder-image w-full h-auto rounded-lg bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

       {/*  <img src={seoulPalace} alt={seoulPalace} /> */}
      </div>

      {/* Offer Details */}
      <div className="boffer-details pl-4 flex flex-col justify-between w-3/4">
        {/* Top Section: Rating, Reviews, and Price */}
        <div className="btop-section flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bofferrating border-2 border-[#4EB7AC] text-black px-2 py-1 rounded-lg">
              {formattedRating} ★
            </div>
            <span className="text-sm text-gray-600">
              ({offer.num_reviews} reviews)
            </span>
          </div>
          <div className="bofferprice text-secondary text-xl font-semibold text-right">
            dzd{offer.min_price}
          </div>
        </div>

        {/* Title */}
        <h3 className="boffer-title text-lg font-bold mt-2">
          {offer.offer_name}
        </h3>

        {/* Departure Date */}
        <p className="bdeparture-date text-sm text-gray-600 mt-1">
          {formattedDepartureDate}
        </p>

        {/* Agency Logo and Name */}
        <div className="bagency-info flex items-center mt-2 space-x-2">
          <Link to={`/agencyprofile/${offer.agency_id}`}>
            {offer.logo && offer.logo[0] ? (
              // Convert the BLOB to an object URL
              <img
                src={offer.logo}
                alt={offer.agency_name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="placeholder-image w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
            )} 
      
          </Link>
          <Link to={`/agencyprofile/${offer.agency_id}`}>
            <span className="text-sm text-gray-800 font-medium">
              {offer.agency_name}
            </span>
          </Link>
        </div>

        {/* Grey Line */}
        <hr className="my-2 border-gray-300" />

        {/* Buttons Section */}
        <div className="bofferbuttons flex">
          {/* Heart Button with Icon */}
          <button className="heart-button flex items-center justify-center w-10 h-10 mr-2 border-2 border-[#4EB7AC] bg-white text-[#4EB7AC] rounded-lg">
            {/* <FaRegHeart />  */}
            <HeartButton offerID={offer.offer_id} userID={clientID} />
         
          </button>

          {/* View Details Button */}

          <button className="bview-details flex-1 bg-[#4EB7AC] text-white p-2 rounded-lg">
            <Link to={`/offerDetails/${offer.offer_id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
