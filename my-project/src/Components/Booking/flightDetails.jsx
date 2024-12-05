import React from 'react';
import flightImage from '../../assets/bookingPics/airline.png';  
import plane_icon from '../../assets/bookingPics/plane_icon.png';  
const FlightDetails = () => {
  return (
    <div className="flight-details">
      <div className="flight-info">
      
        {/* <img src="https://via.placeholder.com/50" alt="Airline Logo" /> */}
        <div>
          
        <p className="info_airbus">
  Emirates A380 Airbus
  <span className="price">$240</span>
</p>

<p className="time_airbus">
          Return Wed, Dec 8
  <span className="time">2h 28m</span>
</p>
          <img src={flightImage} alt="Flight Image" className="airline" />
         
          
        </div>
      </div>
      <p className="flight-timing">
  12:00 PM - Newark (EWR)
  <img src={plane_icon} alt="plane Icon" className="plane-icon" />
  12:00 PM - Newark (EWR)
</p>


    </div>
  );
};

export default FlightDetails;
