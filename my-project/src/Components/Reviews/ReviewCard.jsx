import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';  // Importing star icons
import '../../Style/Review.css';

const ReviewCard = ({ title, description, rating, userName }) => {
 
  const stars = Array(5).fill().map((_, index) => index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />);

  return (
    <div className="Review-card">
      <div className="card-content">
        <h3 className="tilte">{title}</h3>
        <p className="description">{description}</p>
        
        {/* Display rating stars */}
        <div className="rating">
          {stars}
        </div>
        
        <p className="user-name">Reviewed by: {userName}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
