import { useState } from "react";
const OfferHeader = ({ title, destination, price, rating, numReviews }) => {
  const [isFavourite, setisFavourite] = useState(false);

  const OnClickFavourite = () => {
    setisFavourite(!isFavourite);
  };

  return (
    <div className="flex flex-col w-full justify-center py-4">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-bold pb-4">{title}</h1>
          <p className="text-sm flex items-center text-blackishGreen font-medium">
            <span className="material-icons text-blackishGreen text-lg pr-1">
              location_on
            </span>
            {destination}
          </p>
        </div>
        <h1 className="text-2xl font-bold text-secondary pl-4">${price}</h1>
      </div>
      <div className="flex flex-col justify-between items-end pt-4 pb-4 sm:flex-row">
        <div className="flex justify-between items-center gap-2">
          <div className="text-xs py-2 px-4 border-2 border-solid rounded-md border-primary">
            {rating}
          </div>
          <p className="font-bold text-xs">Very Good</p>
          <p className="text-xs">{numReviews} reviews</p>
        </div>
        <div className="flex align-center gap-3">
          <button
            className="flex items-center justify-center"
            onClick={OnClickFavourite}
          >
            {isFavourite ? (
              <i className="material-icons text-red-600 text-base border-2 border-solid rounded-md border-primary py-2 px-4">
                favorite
              </i>
            ) : (
              <i className="material-icons text-blackishGreen text-base border-2 border-solid rounded-md border-primary py-2 px-4">
                favorite_border
              </i>
            )}
          </button>
          <button className="flex items-center justify-center">
            <i className="material-icons text-blackishGreen text-base border-2 border-solid rounded-md border-primary py-2 px-4">
              share
            </i>
          </button>
          <button className="bg-primary py-2 px-8 rounded-md font-semibold text-xs">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferHeader;
