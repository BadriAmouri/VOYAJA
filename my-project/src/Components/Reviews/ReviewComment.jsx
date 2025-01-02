import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "../../Style/Review.css";
import { useParams } from "react-router-dom";
const userID = 3; //STATIC FOR NOW

const ReviewComment = ({ onAddReview, isHome }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const { id } = useParams();

  const endpoint = isHome ? "/api/adminReviews/" : `/api/offers/${id}/reviews`;

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment && rating) {
      setIsSubmitting(true);
      setFeedbackMessage("");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ client_id: userID, comment, rating }), // Static client ID for now
        });

        if (response.ok) {
          const newReview = await response.json(); // Assuming the response includes the new review

          onAddReview(newReview); // Update parent state
          setComment(""); // Clear the form
          setRating(0); // Reset rating
          setFeedbackMessage("Thank you for your review!");
        } else {
          setFeedbackMessage("Failed to submit. Please try again.");
        }
      } catch (error) {
        setFeedbackMessage("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="ReviewComment">
      {isHome ? (
        <h2 className="title">What do you think about our website?</h2>
      ) : (
        <h2 className="title">What do you think about our offer?</h2>
      )}
      <div className="rating-input">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? "filled" : ""}`}
            onClick={() => handleStarClick(index)}
          >
            {index < rating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      {feedbackMessage && <p className="feedback">{feedbackMessage}</p>}
    </div>
  );
};

export default ReviewComment;
