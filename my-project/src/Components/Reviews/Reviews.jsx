import React from 'react';
import ReviewCard from './ReviewCard.jsx';
import '../../Style/Reviews.css'; // Import the CSS file

const Reviews = () => {
  const reviews = [
    { title: "Paris", description: "An amazing experience! Beautiful city with great culture.", rating: 5, userName: "Alice" },
    { title: "London", description: "Had a wonderful time. Great food and people.", rating: 4, userName: "Bob" },
    { title: "New York", description: "A vibrant city with so much to explore!", rating: 4, userName: "Charlie" },
  ];

  return (
    <div className="best">
      <div className="reviewsSec">
        <div>
          <h1>Reviews</h1>
          <p>See what people think about us</p>
        </div>
        {/* Include "See More" text within a span */}
        <button className="seebtn">
          <span>See More</span>
        </button>
      </div>

      <div className="reviews">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            title={review.title}
            description={review.description}
            rating={review.rating}
            userName={review.userName}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
