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
const OfferDetailsPage = () => {
  const offerHeaderData = {
    title: "Trip to South Korea",
    destination: "Gangnam-gu, Teheran-ro, 123, Seoul 06234, South Korea",
    price: 240,
    rating: 4.2,
    constnumReviews: 54,
  };
  const offerOverviewData = {
    departureCity: "Algiers",
    departureDate: "12/11/2024",
    arrivalCity: "Seoul",
    arrivalDate: "16/11/2024",
    description:
      "This is a detailed description of the offer. It includes all relevant details about the trip and what to expect.",
    includedItems: [
      "Round-trip flights",
      "Hotel accommodations",
      "Daily breakfast",
      "City tours",
      "Travel insurance",
    ],
    optionalItems: [
      "Round-trip flights",
      "Hotel accommodations",
      "Daily breakfast",
      "City tours",
      "Travel insurance",
    ],
  };
  const offerPoliciesData = {
    min_num_persons: 1,
    max_num_persons: 5,
    min_age: 8,
    max_age: 50,
  };
  const agencyData = {
    agencyName: "Voyaja Travel Agency",
    agencyLogo: travelLogo,
    agencyLocation: "123 Main St, City, State, 12345",
    agencyPhone: ["+1 123 456 7890", "+1 123 456 7890"],
    agencySocials: {
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      whatsapp: "https://web.whatsapp.com/",
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
