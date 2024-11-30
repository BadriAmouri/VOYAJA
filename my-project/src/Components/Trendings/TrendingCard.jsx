import React from 'react'
import '../../Style/Trending.css'
import { IoIosPaperPlane } from "react-icons/io";

const TrendingCard = ({ image, location, description }) => {
    return (
      <div className="trending-card">
        <img src={image} alt={location} className="trentrencard-image" />
        <div className="trencard-content">
          <h3 className="trenlocation">{location}</h3>
          <p className="trendescription">{description}</p>
          <button className="btn flex flex-row items-center justify-center gap-2">
            <IoIosPaperPlane className="text-base" />
            <span>Show offers</span>
          </button>
        </div>
      </div>
    );
  }
  
export default TrendingCard