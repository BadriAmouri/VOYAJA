import React, { useState } from 'react';
import Navbar from '../Components/bnavBar'; // Import the Navbar component
import Footer from '../Components/Footer';
import Filters from '../Components/Filters';
import SortOptions from '../Components/SortOptions';
import Pagination from '../Components/Pagination';
import AgencyCard from '../Components/AgencyCard';
import AboutUsCard from '../Components/AboutUsCard';
import "../Style/custom-datepicker.css";
import "../Style/agencyProfileStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FaTimes } from 'react-icons/fa';
import { HiAdjustments } from 'react-icons/hi'; // Importing the desired icon
import Agencyofferlist from '../Components/Agencyofferlist';
import Stats from '../Components/StatsCard';

export default function AgencyProfile() {
  const data = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',
      agency: 'Travel Agency 1',
      title: 'Luxury Beach Vacation',
      price: 2500,
      duration: 7,
      rating: 4.5,
      departureDate: '2024-12-15',
      reviews: 120,
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/150', // Placeholder image for the trip
        logo: 'https://via.placeholder.com/50',  
        agency: 'Travel Agency 1',
        title: 'Mountain Adventure',
        price: 1800,
        duration: 5,
        rating: 4.0,
        departureDate: '2024-12-20',
        reviews: 120,
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/150', // Placeholder image for the trip
        logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
        agency: 'Travel Agency 1',
        title: 'City Escape Weekend',
        price: 1200,
        duration: 3,
        rating: 3.5,
        departureDate: '2024-12-10',
        reviews: 120,
      },
      {
          id: 4,
          image: 'https://via.placeholder.com/150', // Placeholder image for the trip
          logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
          agency: 'Travel Agency 1',
          title: 'City Escape Weekend',
          price: 1200,
          duration: 3,
          rating: 3.5,
          departureDate: '2024-12-10',
          reviews: 120,
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/150', // Placeholder image for the trip
            logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
            agency: 'Travel Agency 1',
            title: 'City Escape Weekend',
            price: 1200,
            duration: 3,
            rating: 3.5,
            departureDate: '2024-12-10',
            reviews: 120,
          },
          {
            id: 4,
            image: 'https://via.placeholder.com/150', // Placeholder image for the trip
            logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
            agency: 'Travel Agency 1',
            title: 'City Escape Weekend',
            price: 1200,
            duration: 3,
            rating: 3.5,
            departureDate: '2024-12-10',
            reviews: 120,
          },
  ];

  const agencyInfo = {
    logo: 'https://via.placeholder.com/150', // Placeholder logo
    name: 'Dream Travel Agency',
    location: '123 Main Street, Paris, France',
    email: 'info@dreamtravel.com',
    phone: '+33 1 23 45 67 89',
    Description : "Dream Travel Agency specializes in crafting unforgettable travel experiences. With a focus on customer satisfaction, we offer a wide range of tours and vacation packages tailored to meet your unique needs and preferences.",
    socialMedia: [
        { icon: faFacebook, link: "https://facebook.com" },
        { icon: faTwitter, link: "https://twitter.com" },
        { icon: faInstagram, link: "https://instagram.com" },
    ],
    statsValues : {
        tripsOrganized: "350+",
        happyCustomers: "1,200+",
        experience: "15 Years",
   },
  };

  const [filters, setFilters] = useState({ price: 50, duration: 1, rating: 0 });
  const [sortOption, setSortOption] = useState(data);
  const [offers, setOffers] = useState(data); // Dummy offers for testing
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // State for filter visibility
  const itemsPerPage = 4; // Number of offers to show per page

  // Pagination logic remains unchanged
  const totalItems = offers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastOffer = currentPage * itemsPerPage;
  const indexOfFirstOffer = indexOfLastOffer - itemsPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <div className="agencyProfile-page">
      {/* Navbar at the top */}
      <Navbar />

      {/* Agency Card */}
      <div className="agencycard-box mx-auto mt-4 ml-10">
        <AgencyCard {...agencyInfo} />
      </div>

      <button
        className="agencyfilter-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        <HiAdjustments size={20} color="#4EB7AC" /> {/* Use React Icon here */}
      </button>

      {/* Main Content */}
       <div className="agencyprofile-content flex mt-6">
        {/* Filters on the far left */}
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
         <div className='agency-bio'> 
        {/* About Us Card */}
        <div className="mt-6">
            <AboutUsCard description={agencyInfo["Description"]} />
        </div>
 
        <div className="stats-section mx-auto mt-6">
        <Stats values={agencyInfo.statsValues} />
        </div> 
        
         </div>
 
        </div>

        {/* Right section: Sorting Buttons + Offer List */}
        <div className="agencyofferbtn flex-1 pl-6">
          {/* Added padding to the left */}
          <div className="agencysortingbtn mb-4 custom-align">
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
          </div>
          <div className="agencyoffers">
            <Agencyofferlist offers={currentOffers} itemsPerPage={itemsPerPage} />
          </div>
          {/* Pagination Controls */}
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
        {/* Added padding-bottom to move footer down */}
        <Footer />
      </div>
    </div>
  );
}
