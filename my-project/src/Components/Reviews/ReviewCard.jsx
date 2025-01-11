import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Importing star icons
import "../../Style/Review.css";

const ReviewCard = ({ description, rating, userName }) => {
  const stars = Array(5)
    .fill()
    .map((_, index) =>
      index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
    );

  return (
    <div className="Review-card">
      <div className="card-content">
        <p className="description">{description || "No description"}</p>{" "}
        {/* Handle empty description */}
        {/* Display rating stars */}
        <div className="rating">{stars}</div>
        <p className="user-name">Reviewed by: {userName || "Guest"}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
