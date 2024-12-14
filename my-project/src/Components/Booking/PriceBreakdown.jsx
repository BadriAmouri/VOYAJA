

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import seoulPalace from "../../assets/offerPics/palace.jpg";
const PriceBreakdown = ({ setTotalPrice, setSelectedOptionIds ,offerName }) => {
  const { offerid } = useParams();
  const [selectedItems, setSelectedItems] = useState([]); // Array of selected option objects
  const [options, setOptions] = useState([]); // All available options
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferOptions = async () => {
      try {
        const response = await fetch(`/api/option/${offerid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch offer options');
        }
        const data = await response.json();
        console.log("the data is :",data)
        setOptions(data); // Set the options in state
      } catch (err) {
        setError("AMINA AW KAYEN ERROR ", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferOptions();
  }, []);

  const handleCheckboxChange = (event, option) => {
    const updatedItems = selectedItems.some((item) => item.option_id === option.option_id)
      ? selectedItems.filter((item) => item.option_id !== option.option_id)
      : [...selectedItems, option];

    setSelectedItems(updatedItems);

    // Update parent with selected option IDs
    const selectedIds = updatedItems.map((item) => item.option_id);
    setSelectedOptionIds(selectedIds);
  };

  useEffect(() => {
    const totalPrice = selectedItems.reduce((total, item) => total + item.option_price, 0);
    setTotalPrice(totalPrice);
  }, [selectedItems, setTotalPrice]);

  if (loading) {
    return <p>Loading flight details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="price-breakdown">
      <p className="flight_booking">
        <img src={seoulPalace} alt="plane Image" className="plane_booking" />
        
        <br />
        {offerName}
        <br />
        
      </p>
      <hr />

      <h3>Your Booking is Protected by VOYAGA</h3>
      <p><strong>Price Details</strong></p>
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
            Total: <span>${selectedItems.reduce((total, item) => total + item.option_price, 0)}</span>
          </label>
        </div>
      </div>
    </div>
  );
};
// 
export default PriceBreakdown;
// 
// 