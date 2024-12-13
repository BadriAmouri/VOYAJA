import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../Style/Destinations.css'

const DestinationCard = ({ image, location, description }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const city = location.split(',')[0]; // Extract the city part from the location
    navigate(`/search?destination=${city}`); // Navigate to the search page with the city as query
  };
    return (
      <div className="destination-card" onClick={handleClick}>
        <img src={image} alt={location} className="card-image" />
        <div className="card-content">
          <h3 className="location">{location}</h3>
          <p className="descriptionDest">{description}</p>
        </div>
      </div>
    );
  }
  
export default DestinationCard