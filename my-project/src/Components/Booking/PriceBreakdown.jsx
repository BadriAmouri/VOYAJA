import React from 'react';
import planeImage from '../../assets/bookingPics/plane.png';  

const PriceBreakdown = () => {
  return (
    <div className="price-breakdown">
       <p className="flight">
 
  <img src={planeImage} alt="plane Image" className="plane" />
 Economy
 Emirates A380 Airbus
 reviews
</p>
<hr />
         
      <h3>Your Booking is Protected by VOYAGA</h3>
      <p><strong>Price Details</strong></p>
      <div className="price-details">
  <p>Base Fare: <span>$400</span></p>
  <p>Discount: <span>-$400</span></p>
  <p>Taxes: <span>$400</span></p>
  <p>Service Fee: <span>$400</span></p>
  
   
  <hr />
  <p>Total: <span>$400</span></p>
</div>

       
    </div>
  );
};

export default PriceBreakdown;
