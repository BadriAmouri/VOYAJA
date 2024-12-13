import OfferHeader from "../Components/OfferDetails/OfferHeader.jsx";
import ImageCarousel from "../Components/OfferDetails/ImageCarousel";
import AgencyInfo from "../Components/OfferDetails/AgencyInfo";
import OfferPolicies from "../Components/OfferDetails/OfferPolicies";
import OfferOverview from "../Components/OfferDetails/OfferOverview";
import NavigationBar from "../Components/NavigationBar/navigationBar";
import Footer from "../Components/Footer";
//pictures used
import seoulTower from "../assets/offerPics/seoul-tower.jpg";
import seoulPalace from "../assets/offerPics/palace.jpg";
import springSeoul from "../assets/offerPics/spring-seoul-korea.jpg";
import travelLogo from "../assets/offerPics/travel-agency-logo.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OfferDetailsPage = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/offers/offerDetails/${id}`)
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
  }, [id]);

  // Add null check before accessing response
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!response) return <div>No data found</div>;

  // Extracted and formatted data
  const offerHeaderData = {
    title: response.details.offer_name,
    destination: response.details.offer_dest,
    price: response.details.min_price,
    rating: 4.2,
    numReviews: 54,
    offerID: id,
  };

  const offerOverviewData = {
    departureCity: response.details.offer_depart,
    departureDate: new Date(response.details.starting_date).toLocaleDateString(
      "en-GB"
    ),
    arrivalCity: "Seoul",
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
    min_num_persons: 1,
    max_num_persons: 5,
    min_age: parseInt(agePolicyParts[0], 10),
    max_age: parseInt(agePolicyParts[1], 10),
  };

  const agencyData = {
    agencyName: response.details.agency.agency_name,
    agencyLogo: null,
    agencyLocation: response.details.agency.agency_location,
    agencyPhone: [response.details.agency.agency_phone_number],
    agencySocials: {
      facebook: response.details.agency.facebook_link,
      instagram: response.details.agency.insta_link,
      whatsapp: response.details.agency.whatsapp_link,
    },
  };

  return (
    <div>
      <NavigationBar isHome={false} isLoggedIn={true} />
      <div className="flex flex-col gap-4 w-full px-20 py-6 mt-[65px]">
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
      <Footer />
    </div>
  );
};

export default OfferDetailsPage;
