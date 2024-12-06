import React from 'react'
import '../../Style/Destinations.css'

const DestinationCard = ({ image, location, description }) => {
    return (
      <div className="destination-card">
        <img src={image} alt={location} className="card-image" />
        <div className="card-content">
          <h3 className="location">{location}</h3>
          <p className="descriptionDest">{description}</p>
        </div>
      </div>
    );
  }
  
export default DestinationCard