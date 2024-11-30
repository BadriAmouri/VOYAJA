import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const Reviews = () => {
  const reviews = [
    { title: "Paris", description: "An amazing experience! Beautiful city with great culture.", rating: 5, userName: "Alice" },
    { title: "London", description: "Had a wonderful time. Great food and people.", rating: 4, userName: "Bob" },
    { title: "New York", description: "A vibrant city with so much to explore!", rating: 4, userName: "Charlie" },
  ];

  return (
    <>
      <div className="best w-[80%] mb-8 ml-20 mr-20"> {/* Margin Bottom */}
        <div className="Popular m-5 ml-0 flex items-center justify-between w-full">
          <div>
            <h1 className="font-montserrat text-2xl font-semibold leading-[39px] text-left underline-offset-[3px] decoration-none mb-4">
              Reviews
            </h1>
            <p className="font-montserrat text-base font-normal leading-[19.5px] text-left underline-offset-[3px] decoration-none mb-6">
              See what people think about us
            </p>
          </div>
          <button className="bg-teal-500 text-black py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 mt-4">
            See More
          </button>
        </div>
        <div className="best-destinations grid grid-cols-3 gap-3 w-full p-4 mx-auto">
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
    </>
  );
}

export default Reviews;
