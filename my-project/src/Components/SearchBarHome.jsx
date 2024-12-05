import React, { useState } from 'react';
import '../Style/SearchBarHome.css';
import { IoAirplane } from "react-icons/io5";

const SearchBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchBarToggle = () => {
    setShowSearchBar((prev) => !prev);
  };

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
          {/* Label and input for Date */}
          <div className="input-group">
            <label htmlFor="date-input" className="search-label">
              Depart - Return
            </label>
            <input
              type="text"
              id="date-input"
              className="search-input"
              placeholder="Enter date"
            />
          </div>
        </div>
        <button className="search-button">Search</button>
      </div>
    </>
  );
};

export default SearchBar;
