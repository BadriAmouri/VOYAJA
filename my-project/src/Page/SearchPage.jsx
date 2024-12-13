import React, { useState,useEffect } from 'react';
import Footer from '../Components/Footer';
import SearchBar from '../Components/search/SearchBar';
import Filters from '../Components/search/Filters';
import SortOptions from '../Components/search/SortOptions';
import OfferList from '../Components/search/OfferList';
import Pagination from '../Components/search/Pagination';
import "../Style/custom-datepicker.css";
import "../Style/Searchpagestyle.css"; 
import { FaTimes } from 'react-icons/fa';
import { HiAdjustments } from 'react-icons/hi'; // Importing the desired icon
import { useLocation } from "react-router-dom"; 
import NavigationBar from '../Components/NavigationBar/navigationBar';

export default function SearchPage() {
 
 
  const location = useLocation(); // Access the URL
  const queryParams = new URLSearchParams(location.search); // Parse query params
      const [filters, setFilters] = useState({
          price: null,
          rating: null,
          duration:null, 
      });
      const [sort , setSort]=useState('');
      const [page , setPage]=useState(1);
      const [searchParams, setSearchParams] = useState({
        destination: queryParams.get("destination") || "", // Initialize from query
        departureDate: queryParams.get("departureDate") 
        ? new Date(queryParams.get("departureDate")) // Convert to Date object if available
        : null,
      });
      const limit=3;
      const [offers, setOffers] = useState([]); // Offers data
      const [showFilters, setShowFilters] = useState(false); // State for filter visibility
      //const totalPages = Math.ceil(offers.totalItems /limit|| 1);
      const [totalPages, setTotalPages] = useState(1);


      // Fetch Offers
      useEffect(() => {
        console.log("Search Params changed:", searchParams);

        const fetchOffers = async () => {
          try {
            
            const queryParams = new URLSearchParams();

            // Append individual filter values directly as query parameters
            if (filters.price) queryParams.append('price', filters.price);
            if (filters.rating) queryParams.append('rating', filters.rating);
            if (filters.duration) queryParams.append('duration', filters.duration);
      
            // Append searchParams directly as individual parameters
            if (searchParams.destination) queryParams.append('destination', searchParams.destination);
            if (searchParams.departureDate) {
              const formattedDate = new Date(searchParams.departureDate)
                .toISOString()
                .split('T')[0]; // Extract only the date part
              queryParams.append('departureDate', formattedDate);
            }
            // Add sort, page, and limit
            if (sort) queryParams.append('sort', sort);
            queryParams.append('page', page);
            queryParams.append('limit', limit);
      
            const url = `/api/offers/search?${queryParams}`;
            const response = await fetch(`/api/offers/search?${queryParams}`);
            console.log("URL is :", url);
            const data = await response.json();
            
            setOffers(data.offers); // Update state with fetched data
            setTotalPages(data.totalPages || 1);

          } catch (error) {
            console.error("Error fetching offers:", error);
          }
        };        
        fetchOffers();
      }, [filters,sort,page,searchParams,limit]); // Trigger fetch whenever filters change

      // Handle Pagination
      const handlePageChange = (pageNumber) => {
        setPage( pageNumber );
      };

      const handleNext = () => {
        if (page < totalPages) {
          setPage( page+1 );
        }
      };

      const handlePrevious = () => {
        if (page > 1) {
          setPage( page-1 );
        }
      };

 
  return (
    <div className="search-page">
      {/* Navbar at the top */}
      <NavigationBar />

      {/* Search Bar */}
      <div className="search-bar">
      <SearchBar searchParams={searchParams} setSearchParams={setSearchParams}/>
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
        <button className="close-button" onClick={() => setShowFilters(!showFilters)}>
        <FaTimes />
        </button>
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        
        {/* Right section: Sorting Buttons + Offer List */}
        <div className="offerbtn flex-1 pl-6"> {/* Added padding to the left */}
          <div className="sortingbtn mb-4 custom-align">
            <SortOptions sortOption={sort} setSortOption={setSort} />
          </div>
          <div className='boffers'>
          <OfferList offers={offers || [] } />
          </div>
          {/* Pagination Controls */}
          <Pagination
            currentPage={page}
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