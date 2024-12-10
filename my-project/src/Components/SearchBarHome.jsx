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
  const navigate = useNavigate();

  const handleSearchBarToggle = () => {
    setShowSearchBar((prev) => !prev);
  };
  const handleSearchRequest = () =>{
    // check if all the data are in 
    navigate('/search')
  }
  return (
    <>
      {/* Button to trigger the search bar, visible only on small screens */}
      <button 
        onClick={handleSearchBarToggle} 
        className="search-bar-toggle-btn">
        <IoAirplane /> Search Offers
      </button>

      {/* Search bar container, conditionally shown on small screens */}
      <div className={`search-bar-container ${showSearchBar ? 'show' : ''}`}>
        <div className="deco">
          <IoAirplane /> <span>Find Offer</span>
        </div>
        <div className="input-fields">
          {/* Label and input for Place */}
          <div className="input-group">
            <label htmlFor="place-input" className="search-label">
              From - To
            </label>
            <input
              type="text"
              id="place-input"
              className="search-input"
              placeholder="Enter place"
            />
          </div>
          {/* Label and DatePicker for Date */}
          <div className="input-group">
            <label htmlFor="date-input" className="search-label-date">
              Depart - Return
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="search-input"
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
              popperPlacement="bottom"
            />
          </div>

        </div>
        <button 
        onClick={handleSearchRequest}
        className="search-button">Search</button>
      </div>
    </>
  );
};

export default SearchBarH;
