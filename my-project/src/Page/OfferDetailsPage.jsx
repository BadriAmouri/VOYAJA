import OfferHeader from "../Components/OfferDetails/OfferHeader.jsx";
import ImageCarousel from "../Components/OfferDetails/ImageCarousel";
import AgencyInfo from "../Components/OfferDetails/AgencyInfo";
import OfferPolicies from "../Components/OfferDetails/OfferPolicies";
import OfferOverview from "../Components/OfferDetails/OfferOverview";
//pictures used
import seoulTower from "../assets/offerPics/seoul-tower.jpg";
import seoulPalace from "../assets/offerPics/palace.jpg";
import springSeoul from "../assets/offerPics/spring-seoul-korea.jpg";
import travelLogo from "../assets/offerPics/travel-agency-logo.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const OfferDetailsPage = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // Access the URL
  const queryParams = new URLSearchParams(location.search);
  const offerID = queryParams.get("id"); // Assuming "id" is the query param

  useEffect(() => {
    if (!offerID) return; // Check if offerID exists before making the request

    fetch(`/api/offers/search/?${offerID}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setResponse(data);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }, [offerID]);

  // Extracted and formatted data
  const offerHeaderData = {
    title: response.details.offer_name,
    destination: response.details.offer_dest,
    price: response.details.min_price, // Assuming min_price is the required price
    rating: 4.2, // Placeholder value, replace if needed
    numReviews: 54, // Placeholder value, replace if needed
  };

  const offerOverviewData = {
    departureCity: response.details.offer_depart,
    departureDate: new Date(response.details.starting_date).toLocaleDateString(
      "en-GB"
    ),
    arrivalCity: "Seoul", // Assuming destination city is Seoul; adjust if needed
    arrivalDate: new Date(response.details.return_date).toLocaleDateString(
      "en-GB"
    ),
    description: response.details.offer_description,
    includedItems: response.details.included,
    optionalItems: response.details.options.map(
      (option) => option.option_title
    ),
  };

  const agePolicyParts = response.details.Age_policy;
  const offerPoliciesData = {
    min_num_persons: 1, // Placeholder, adjust if needed
    max_num_persons: 5, // Placeholder, adjust if needed
    min_age: parseInt(agePolicyParts[0], 10),
    max_age: parseInt(agePolicyParts[1], 10),
  };

  const agencyData = {
    agencyName: response.details.agency.agency_name,
    agencyLogo: null, // Placeholder as logo is not provided in response
    agencyLocation: response.details.agency.agency_location,
    agencyPhone: [response.details.agency.agency_phone_number],
    agencySocials: {
      facebook: response.details.agency.facebook_link,
      instagram: response.details.agency.insta_link,
      whatsapp: response.details.agency.whatsapp_link,
    },
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen px-20 py-6 mt-[65px]">
      <OfferHeader {...offerHeaderData} />
      <div className="flex gap-6 ">
        <div className="flex-[3_3_70%] ">
          <ImageCarousel
            images={[
              seoulTower,
              seoulPalace,
              springSeoul,
              seoulTower,
              seoulPalace,
              springSeoul,
            ]}
          />
        </div>
        <div className="w-full flex-[3_3_30%] ">
          <AgencyInfo {...agencyData} />
        </div>
      </div>
      <OfferPolicies {...offerPoliciesData} />
      <OfferOverview {...offerOverviewData} />
    </div>
  );
};

export default OfferDetailsPage;
