// export default FlightDetails;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import flightImage1 from "../../assets/bookingPics/airline1.png";
import flightImage2 from "../../assets/bookingPics/airline2.png";
import plane_icon from "../../assets/bookingPics/plane_icon.png";
import seoulTower from "../../assets/offerPics/seoul-tower.jpg";
import seoulPalace from "../../assets/offerPics/palace.jpg";
import springSeoul from "../../assets/offerPics/spring-seoul-korea.jpg";
import travelLogo from "../../assets/offerPics/travel-agency-logo.jpg";
const FlightDetails = ({ setOfferName, setAgencyID }) => {
  const { offerid } = useParams();
  const { id } = 2; //useParams(); Dynamically fetch the 'id' from the URL
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOffer = async () => {
      try {
        const response = await fetch(`/api/offers/${offerid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch flight details");
        }
        const data = await response.json();
        setFlightDetails(data.offer);
        setOfferName(data.offer.offer_name);

        setAgencyID(data.offer.agency_id); // Pass the agency ID to the parent
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOffer();
  }, [offerid, setAgencyID]);
  // Re-run this effect when 'id' changes

  if (loading) {
    return <p>Loading flight details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!flightDetails) {
    return <p>No flight details available.</p>;
  }
  //
  //
  //
  const {
    offer_name,
    min_price,
    duration,
    starting_date,
    pictures_urls,
    return_date,
  } = flightDetails;

  console.log(min_price);
  return (
    <div className="flight-details">
      <div className="flight-info">
        <div>
          <p className="info_airbus">
            {flightDetails.offer_name || "Flight Information"}
            <span className="price_booking">${min_price || "N/A"}</span>
          </p>

          <p className="time_airbus">
            {new Date(starting_date).toDateString() || "N/A"}
            <span className="time_booking">{duration || "N/A"}h</span>
          </p>

          {/* Display images from fetched data or placeholders */}
          <div className="airline-images">
            <img
              src={travelLogo}
              alt="Airline Image 1"
              className="airline-image"
            />
            <img
              src={flightImage2}
              alt="Airline Image 2"
              className="airline-imageop"
            />
          </div>
        </div>
      </div>
      <p className="flight-timing">
        {new Date(starting_date).toDateString() || "N/A"}
        <img src={plane_icon} alt="plane Icon" className="plane-icon" />
        {new Date(return_date).toDateString() || "N/A"}
      </p>
    </div>
  );
};

export default FlightDetails;
