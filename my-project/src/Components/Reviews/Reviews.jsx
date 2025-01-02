import React, { useState } from "react";
import ReviewCard from "./ReviewCard.jsx";
import ReviewComment from "./ReviewComment.jsx";
import "../../Style/Reviews.css"; // Import the CSS file

const Reviews = ({ previousReviews, isHome }) => {
  const [reviews, setReviews] = useState(previousReviews);

  const handleAddReview = (newReview) => {
    console.log("HANDLING THE NEW REVIEW ADDED IN HOME: ", newReview.review);
    setReviews((prevReviews) => [...prevReviews, newReview.review]); // Update the state immediately
  };

  return (
    <div className="best">
      <div className="reviewsSec">
        <div>
          <h1>Reviews</h1>
          <p>See what people think about us</p>
        </div>
        <button className="seebtn">
          <span>See More</span>
        </button>
      </div>
      {/* Add Review Comment */}
      <ReviewComment onAddReview={handleAddReview} isHome={isHome} />
      {Array.isArray(reviews) && reviews.length === 0 ? (
        <p className="">No reviews for now</p>
      ) : (
        <div className="reviews">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              description={review.comment}
              rating={review.rating}
              userName={review.client_email || "You"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
