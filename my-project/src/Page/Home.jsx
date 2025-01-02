import React, { useEffect, useState } from "react";
import "../Style/Home.css";
import heroSection from "../assets/HomePics/heroSection.jpg";
import SearchBarH from "../Components/SearchBarHome";
import BestDestinations from "../Components/Destinations/BestDestination";
import TrendingSection from "../Components/Trendings/TrendingSection";
import Reviews from "../Components/Reviews/Reviews";
import Footer from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar/navigationBar";
import { useAppContext } from "../contexts/AppContext";

const Home = () => {
  const isHome = true;
  const { isLoggedIn } = useAppContext();

  const [adminReviews, setAdminReviews] = useState([]);
  //const [previousReviews, setPreviousReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/adminReviews");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAdminReviews(data.reviews || []);
      } catch (err) {
        console.error("Error fetching admin reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty array makes it run only once

  return (
    <div className="Home">
      <div className="imgBg">
        <img src={heroSection} alt="Hero Section" className="image" />
      </div>
      <div className="sectionText">
        <h2>Helping Others</h2>
        <h1>LIVE & TRAVEL</h1>
        <p>Special offers to suit your plan</p>
      </div>
      <NavigationBar isHome={true} />
      <SearchBarH />
      <BestDestinations />
      <TrendingSection />
      {loading ? (
        <p>Loading...</p> // Display loading state
      ) : (
        <Reviews
          previousReviews={isHome ? adminReviews : []} // Ensure this is always an array
          isHome={isHome}
        />
      )}
      <Footer />
    </div>
  );
};

export default Home;
