import React from 'react';
import flightImage1 from '../../assets/bookingPics/airline1.png'; // First image
import flightImage2 from '../../assets/bookingPics/airline2.png'; // Second image
import plane_icon from '../../assets/bookingPics/plane_icon.png';

const FlightDetails = () => {
  return (
    <div className="flight-details">
      <div className="flight-info">
        {/* <img src="https://via.placeholder.com/50" alt="Airline Logo" /> */}
        <div>
          <p className="info_airbus">
            Emirates A380 Airbus
            <span className="price_booking">$240</span>
          </p>

          <p className="time_airbus">
            Return Wed, Dec 8
            <span className="time_booking">2h 28m</span>
          </p>

          {/* Include both images side by side */}
          <div className="airline-images">
            <img src={flightImage1} alt="Airline Image 1" className="airline-image" />
            <img src={flightImage2} alt="Airline Image 2" className="airline-image" />
          </div>
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
