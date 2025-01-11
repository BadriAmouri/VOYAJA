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
import "../../Style/booking.css";
const FlightDetails = ({ setOfferName, setAgencyID }) => {
  const { offerid } = useParams();
  const { id } = 2; // useParams(); Dynamically fetch the 'id' from the URL
  const [flightDetails, setFlightDetails] = useState(null);
  const [agencyLogo, setAgencyLogo] = useState(null); // To store the agency logo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flight details and agency logo
  // Fetch flight details and agency logo
  useEffect(() => {
    const getOffer = async () => {
      try {
        const response = await fetch(`/api/offers/${offerid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch flight details");
        }
        const data = await response.json();
        setFlightDetails(data.offer); // Set the flight details
        setOfferName(data.offer.offer_name); // Set the offer name
        console.log("Pictures field:", data.offer.pictures);

        // Fetch agency ID using the offer ID
        const agencyResponseID = await fetch(
          `/api/offers/getagencyid/${offerid}`
        );
        if (!agencyResponseID.ok) {
          throw new Error("Failed to fetch agency ID");
        }
        const agencyDataa = await agencyResponseID.json();

        // Access the agency_id directly
        const agencyId = agencyDataa.agency_id; // This will give you the number (7)

        // Optionally log the agency ID
        console.log("Agency ID:", agencyId); // Should log 7
        // Fetch agency logo using the agency_id
        const agencyResponse = await fetch(`/api/agencypic/${agencyId}`);

        const agencyData = await agencyResponse.json();
        const agencyLogoUrl = agencyData.logo_url; // Corrected to match the key from the response
        setAgencyID(agencyId);
        setAgencyLogo(agencyLogoUrl);
        console.log(agencyLogoUrl);
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    getOffer(); // Fetch flight and agency details when the component mounts
  }, [offerid, id]);

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
    pictures,
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
              src={agencyLogo} // Use fetched agency logo or fallback to default logo
              alt="Agency Logo"
              className="agency-logo"
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
