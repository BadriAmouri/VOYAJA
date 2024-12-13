import React, { useState } from 'react';
import '../Style/SearchBarHome.css';
import { IoAirplane } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../Style/custom-datepicker.css";
import { useNavigate } from 'react-router-dom';

const SearchBarH = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearchBarToggle = () => {
    setShowSearchBar((prev) => !prev);
  };

  const handleSearchRequest = () => {
    // Check if both destination and date are provided
    if (destination && selectedDate) {
      // Format the date as 'YYYY-MM-DD'
      const formattedDate = selectedDate.toISOString();
      
      // Navigate to the search page with query parameters
      navigate(`/search?destination=${destination}&departureDate=${formattedDate}`);
    } else {
      alert("Please provide both destination and departure date.");
    }
  };

  return (
    <>
      <button 
        onClick={handleSearchBarToggle} 
        className="search-bar-toggle-btn">
        <IoAirplane /> Search Offers
      </button>

      <div className={`search-bar-container ${showSearchBar ? 'show' : ''}`}>
        <div className="deco">
          <IoAirplane /> <span>Find Offer</span>
        </div>
        <div className="input-fields">
          <div className="input-group">
            <label htmlFor="place-input" className="search-label">
              From - To
            </label>
            <input
              type="text"
              id="place-input"
              className="search-input"
              placeholder="Enter place"
              value={destination}
              onChange={(e) => setDestination(e.target.value)} // Update destination state
            />
          </div>
          <div className="input-group">
            <label htmlFor="date-input" className="search-label-date">
              Depart - Return
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)} // Update selected date
              className="search-input"
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
              popperPlacement="bottom"
            />
          </div>
        </div>
        <button 
          onClick={handleSearchRequest}
          className="search-button">
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBarH;
