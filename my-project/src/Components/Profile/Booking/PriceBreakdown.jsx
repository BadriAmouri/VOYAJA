import React, { useState } from 'react';
import planeImage from '../../assets/bookingPics/plane.png';  

const PriceBreakdown = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedItems((prevItems) =>
      prevItems.includes(value)
        ? prevItems.filter((item) => item !== value)
        : [...prevItems, value]
    );
  };

  return (
    <div className="price-breakdown">
      <p className="flight">
        <img src={planeImage} alt="plane Image" className="plane" />
        Economy
        <br />
        Emirates A380 Airbus
        <br />
        reviews
      </p>
      <hr />
         
      <h3>Your Booking is Protected by VOYAGA</h3>
      <p><strong>Price Details</strong></p>
      <div className="price-details">
        <div className="checkbox-item">
          <label>
            <input
              type="checkbox"
              value="Base Fare"
              onChange={handleCheckboxChange}
            />
            Base Fare: <span>$400</span>
          </label>
        </div>
        <div className="checkbox-item">
          <label>
            <input
              type="checkbox"
              value="Discount"
              onChange={handleCheckboxChange}
            />
            Discount: <span>-$400</span>
          </label>
        </div>
        <div className="checkbox-item">
          <label>
            <input
              type="checkbox"
              value="Taxes"
              onChange={handleCheckboxChange}
            />
            Taxes: <span>$400</span>
          </label>
        </div>
        <div className="checkbox-item">
          <label>
            <input
              type="checkbox"
              value="Service Fee"
              onChange={handleCheckboxChange}
            />
            Service Fee: <span>$400</span>
          </label>
        </div>
        <hr />
        <div className="checkbox-item">
          <label>
            
            Total: <span>$400</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
