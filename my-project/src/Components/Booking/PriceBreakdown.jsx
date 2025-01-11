import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import seoulPalace from "../../assets/offerPics/palace.jpg"; // Fallback image in case the API doesn't return a picture.

const PriceBreakdown = ({ setTotalPrice, setSelectedOptionIds, offerName }) => {
  const { offerid } = useParams();
  const [selectedItems, setSelectedItems] = useState([]); // Array of selected option objects
  const [options, setOptions] = useState([]); // All available options
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offerPicture, setOfferPicture] = useState(null); // New state to store the offer picture URL

  // Fetch offer options and offer details including picture
  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        // Fetching the offer details (including the picture)
        const response = await fetch(`/api/offers/${offerid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch offer details");
        }
        const data = await response.json();
        setOfferPicture(data.offer.pictures || seoulPalace); // Store the picture URL (or fallback to seoulPalace)

        // Now fetch the options
        const optionsResponse = await fetch(`/api/option/${offerid}`);
        if (!optionsResponse.ok) {
          throw new Error("Failed to fetch offer options");
        }
        const optionsData = await optionsResponse.json();
        setOptions(optionsData); // Set the options in state
      } catch (err) {
        setError("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferDetails(); // Call the function to fetch the offer details and options
  }, [offerid]);

  const handleCheckboxChange = (event, option) => {
    const updatedItems = selectedItems.some(
      (item) => item.option_id === option.option_id
    )
      ? selectedItems.filter((item) => item.option_id !== option.option_id)
      : [...selectedItems, option];

    setSelectedItems(updatedItems);

    // Update parent with selected option IDs
    const selectedIds = updatedItems.map((item) => item.option_id);
    setSelectedOptionIds(selectedIds);
  };

  useEffect(() => {
    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.option_price,
      0
    );
    setTotalPrice(totalPrice);
  }, [selectedItems, setTotalPrice]);

  if (loading) {
    return <p>Loading flight details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="price-breakdown">
      <p className="flight_booking">
        <img
          src={offerPicture || seoulPalace} // If no picture, use seoulPalace as fallback
          alt="Offer Image"
          className="plane_booking"
        />
        <br />
        {offerName}
        <br />
      </p>
      <hr />

      <h3>Your Booking is Protected by VOYAJA</h3>
      <p>
        <strong>Price Details</strong>
      </p>
      <div className="price-details_booking">
        {options.length > 0 ? (
          options.map((option) => (
            <div className="checkbox-item" key={option.option_id}>
              <label>
                <input
                  type="checkbox"
                  value={option.option_id}
                  onChange={(event) => handleCheckboxChange(event, option)}
                />
                {option.option_title}: <span>${option.option_price}</span>
              </label>
            </div>
          ))
        ) : (
          <p>No options available.</p>
        )}
        <hr />
        <div className="checkbox-item">
          <label>
            Total:{" "}
            <span>
              $
              {selectedItems.reduce(
                (total, item) => total + item.option_price,
                0
              )}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
