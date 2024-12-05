import React, { useState } from 'react';
import Navbar from '../Components/bnavBar'; // Import the Navbar component
import Footer from '../Components/Footer';
import SearchBar from '../Components/SearchBar';
import Filters from '../Components/Filters';
import SortOptions from '../Components/SortOptions';
import OfferList from '../Components/OfferList';
import Pagination from '../Components/Pagination';
import "../Style/custom-datepicker.css";
import "../Style/Searchpagestyle.css"; 
import { FaTimes } from 'react-icons/fa';
import { HiAdjustments } from 'react-icons/hi'; // Importing the desired icon

export default function SearchPage() {
  const data = [ {
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
    agency: 'Travel Agency 2',
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
    agency: 'Travel Agency 3',
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
      agency: 'Travel Agency 3',
      title: 'City Escape Weekend',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
      agency: 'Travel Agency 3',
      title: 'City Escape Weekend',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
      agency: 'Travel Agency 3',
      title: 'City Escape Weekend',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
      agency: 'Travel Agency 3',
      title: 'New york city light',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
      agency: 'Travel Agency 3',
      title: 'Paris city of love',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },
    {
      id: 9,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
      agency: 'Travel Agency 3',
      title: 'Let s get lost in Japan',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },
    {
      id: 10,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
      agency: 'Travel Agency 3',
      title: 'Busan where you experience magic',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },
    {
      id: 11,
      image: 'https://via.placeholder.com/150', // Placeholder image for the trip
      logo: 'https://via.placeholder.com/50',   // Placeholder image for the agency logo
      agency: 'Travel Agency 3',
      title: 'Dubai next destination',
      price: 1200,
      duration: 3,
      rating: 3.5,
      departureDate: '2024-12-10',
      reviews: 120,
    },];
  const [filters, setFilters] = useState({ price: 50, duration: 1, rating: 0 });
  const [sortOption, setSortOption] = useState(data);
  const [offers, setOffers] = useState(data); // Dummy offers for testing
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // State for filter visibility
  const itemsPerPage = 5; // Number of offers to show per page
    // Step 2: Calculate offers to show based on current page
    const totalItems = offers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const indexOfLastOffer = currentPage * itemsPerPage;
    const indexOfFirstOffer = indexOfLastOffer - itemsPerPage;
    const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);
  
    // Step 3: Pagination controls
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
    <div className="search-page">
      {/* Navbar at the top */}
      <Navbar />

      {/* Search Bar */}
      <div className="search-bar">
      <SearchBar/>
      </div>
      <button
        className="filter-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        <HiAdjustments  size={20} color="#4EB7AC" /> {/* Use React Icon here */}
      </button>

      {/* Main Content */}
      <div className="search-content flex mt-6">
        {/* Filters on the far left */}
        <div className={`filters ${showFilters ? "visible" : ""}`}>
        <button class="close-button" onClick={() => setShowFilters(!showFilters)}>
        <FaTimes />
        </button>
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        
        {/* Right section: Sorting Buttons + Offer List */}
        <div className="offerbtn flex-1 pl-6"> {/* Added padding to the left */}
          <div className="sortingbtn mb-4 custom-align">
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
          </div>
          <div className='boffers'>
          <OfferList offers={currentOffers} />
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
      <div className="search-page mt-6 "> {/* Added padding-bottom to move footer down */}
      <Footer />
      </div>
      
      
    </div>
  );
}  