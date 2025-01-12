import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Filters from '../search/Filters';
import SortOptions from '../search/SortOptions';
import Pagination from '../search/Pagination';
import AgencyCard from '../search/AgencyCard';
import AboutUsCard from '../search/AboutUsCard';
import Stats from '../search/StatsCard';
import Agencyofferlist from '../search/Agencyofferlist';
import "../../Style/custom-datepicker.css";
import "../../Style/agencyProfileStyle.css";
import { FaTimes } from 'react-icons/fa';
import { HiAdjustments } from 'react-icons/hi';

export default function AgencyAdminView() {
  //const { agencyId } = useParams();
  const params = useParams();
  //console.log("========================",agencyId);
  console.log("Params:222222222222222222", params);

  const [filters, setFilters] = useState({ price: 20000000, duration: 60, rating: 0 });
  const [sortOption, setSortOption] = useState("");
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [agencyInfo, setAgencyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsValues, setStatsValues] = useState({
    tripsOrganized: "",
    happyCustomers: "",
    experience: ""
  });
  const itemsPerPage = 4;
  const calculateTotalReviews = (offers) => {
    if (!Array.isArray(offers)) {
      console.error("Invalid offers data:", offers);
      return 0;
    }

    return offers.reduce((sum, offer) => {
      const reviews = parseInt(offer.review_count, 10); // Ensure it's a number
      return sum + (isNaN(reviews) ? 0 : reviews); // Add only valid numbers
    }, 0);
  };


  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/agency/${params.id}`);
        const data = await response.json();
        console.log('the data of the agency is' ,{data});

        // Populate state with fetched datattp://localhost:5000/
        setAgencyInfo(data);
        setOffers(data.offers || []);
        // Calculate total reviews from all offers
        const totalReviews = calculateTotalReviews(data.offers)
        setTotalPages(Math.ceil((data.offers?.length || 0) / itemsPerPage)); // Calculate total pages
        setStatsValues({
          tripsOrganized: data.offers?.length || 0,
          happyCustomers: totalReviews,
          experience: data.experience || "N/A",
        });
      } catch (error) {
        console.error("Error fetching agency data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyData();
  }, [params.id]);

  const getFilteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      return (
        offer.min_price <= filters.price && // Price filter
        offer.duration <= filters.duration &&  // Duration filter
        offer.average_rating >= filters.rating // Rating filter
      );
    });
  }, [offers, filters]);

  const getSortedOffers = useMemo(() => {
    let filteredOffers = getFilteredOffers; // First apply filters 

    if (sortOption === "Cheapest") {
      filteredOffers.sort((a, b) => a.min_price - b.min_price); // Sort by price (ascending)
    } else if (sortOption === "Best") {
      filteredOffers.sort((a, b) => b.average_rating - a.average_rating); // Sort by rating (descending)
    } else if (sortOption === "Quickest") {
      filteredOffers.sort((a, b) => a.duration - b.duration); // Sort by duration (ascending)
    }
    setTotalPages(Math.ceil(filteredOffers?.length / itemsPerPage));
    return filteredOffers;
  }, [getFilteredOffers, sortOption]);

  const paginatedOffers = getSortedOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <div className="agencyProfile-page">

      {agencyInfo && (
        <div className="agencycard-box mx-auto mt-4 ml-10">
          <AgencyCard agency={agencyInfo} />
        </div>
      )}

      <button
        className="agencyfilter-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        <HiAdjustments size={20} color="#4EB7AC" />
      </button>

      <div className="agencyprofile-content flex mt-6">
        <div>
          <div className={`Agencyfilters ${showFilters ? 'visible' : ''}`}>
            <button
              className="close-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaTimes />
            </button>
            <Filters filters={filters} setFilters={setFilters} />
          </div>
          <div className="agency-bio">
            {agencyInfo && (
              <>
                <div className="mt-6">
                  <AboutUsCard description={agencyInfo.agency_description} />
                </div>
                <div className="stats-section mx-auto mt-6">
                  <Stats values={statsValues} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="agencyofferbtn flex-1 pl-6">
          <div className="agencysortingbtn mb-4 custom-align">
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
          </div>
          <div className="agencyoffers">
            <Agencyofferlist offers={paginatedOffers} itemsPerPage={itemsPerPage} agency_name={agencyInfo.agency_name} agency_logo={agencyInfo.logo} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </div>

      <div className="agencysearch-page mt-6">
      </div>
    </div>
  );
}
