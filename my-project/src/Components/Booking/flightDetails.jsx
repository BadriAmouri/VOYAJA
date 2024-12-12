// import React, { useState, useEffect } from 'react';
// import flightImage1 from '../../assets/bookingPics/airline1.png'; // First image
// import flightImage2 from '../../assets/bookingPics/airline2.png'; // Second image
// import plane_icon from '../../assets/bookingPics/plane_icon.png';

// const FlightDetails = () => {
//   return (
//     <div className="flight-details">
//       <div className="flight-info">
//         {/* <img src="https://via.placeholder.com/50" alt="Airline Logo" /> */}
//         <div>
//           <p className="info_airbus">
//             Emirates A380 Airbus
//             <span className="price_booking">$240</span>
//           </p>

//           <p className="time_airbus">
//             Return Wed, Dec 8
//             <span className="time_booking">2h 28m</span>
//           </p>

//           {/* Include both images side by side */}
//           <div className="airline-images">
//            {/* first for the logo */}
//             <img src={flightImage1} alt="Airline Image 1" className="airline-image" />
//             <img src={flightImage2} alt="Airline Image 2" className="airline-image" />
//           </div>
//         </div>
//       </div>
//       <p className="flight-timing">
//         12:00 PM - Newark (EWR)
//         <img src={plane_icon} alt="plane Icon" className="plane-icon" />
//         12:00 PM - Newark (EWR)
//       </p>
//     </div>
//   );
// };

// export default FlightDetails;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import flightImage1 from '../../assets/bookingPics/airline1.png';
import flightImage2 from '../../assets/bookingPics/airline2.png';
import plane_icon from '../../assets/bookingPics/plane_icon.png';

const FlightDetails = () => {
  const { id } = 2 //useParams(); Dynamically fetch the 'id' from the URL
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOffer = async () => {
      try {
        const response = await fetch(`/api/offers/9`); // Use the dynamic 'id' in the API call
        if (!response.ok) {
          throw new Error('Failed to fetch flight details');
        }
        const data = await response.json();
        setFlightDetails(data.offer); // Set the response data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    getOffer(); // Call the function to fetch offer details
  }, [id]); // Re-run this effect when 'id' changes

  if (loading) {
    return <p>Loading flight details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!flightDetails) {
    return <p>No flight details available.</p>;
  }

  const {
    offer_name,
    min_price,
    duration,
    starting_date,
    pictures_urls,
  } = flightDetails;

  console.log (min_price);
  return (
    <div className="flight-details">
      <div className="flight-info">
        <div>
          <p className="info_airbus">
            {flightDetails.offer_name || 'Flight Information'}
            <span className="price_booking">${min_price || 'N/A'}</span>
          </p>

          <p className="time_airbus">
           {new Date(starting_date).toDateString() || 'N/A'}
            <span className="time_booking">{duration || 'N/A'}h</span>
          </p>

          {/* Display images from fetched data or placeholders */}
          <div className="airline-images">
            <img
              src={pictures_urls?.[0] || flightImage1}
              alt="Airline Image 1"
              className="airline-image"
            />
            <img
              src={flightImage2}
              alt="Airline Image 2"
              className="airline-image"
            />
          </div>
        </div>
      </div>
      <p className="flight-timing">
      {new Date(starting_date).toDateString() || 'N/A'}
        <img src={plane_icon} alt="plane Icon" className="plane-icon" />
        {new Date(starting_date).toDateString() || 'N/A'}
      </p>
    </div>
  );
};

export default FlightDetails;
