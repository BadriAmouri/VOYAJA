// src/components/SearchBar.js
import React from 'react';
import '../Style/SearchBarHome.css'; // We will write the styling for the search bar here
import { IoAirplane } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
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
        placeholder=""
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
        placeholder=""
      />
    </div>
  </div>
  <button className="search-button">Search</button>
</div>

  );
}

export default SearchBar;
