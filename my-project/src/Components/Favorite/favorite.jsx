import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OfferCard from "../search/OfferCard"; // One level up, then into search folder
import NavigationBar from '../NavigationBar/navigationBar';
import '../../Style/fav.css';
import { useAppContext } from "../../contexts/AppContext";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const {clientID, setClientID} = useAppContext()

  // Fetch the user's favorite offers when the component mounts
  useEffect(() => {
    const fetchFavoriteOffers = async () => {
      try {
       // const clientID = 18; 
        const response = await fetch(`api/favorite-offers/${clientID}`);
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorite offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteOffers();
  }, []);

  // Remove an offer from favorites
  const handleRemoveFavorite = (offerId) => {
    // Optimistically remove the offer immediately from the UI
    setFavorites((prevFavorites) =>
      prevFavorites.filter((offer) => offer.offer_id !== offerId)
    );

    // Simulate the removal API request
    //const clientID = 18; // Replace with the actual userID if needed
    fetch(`/api/remove-favorite/${clientID}/${offerId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Optionally handle success response here
        console.log(`Offer ${offerId} removed successfully`);
      })
      .catch((error) => {
        // If the API call fails, you may want to revert the UI change or show an error message
        console.error("Error removing favorite:", error);
        // Optionally add the offer back to the list if the API call fails
        // setFavorites(prevFavorites => [...prevFavorites, offerId]);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="favorite-page-container">
      <NavigationBar isLoggedIn={true} />
      <div className="favorite-page">
        <h2>Your Favorite Offers</h2>
        <div className="boffer-list space-y-4 center">
          {favorites.length > 0 ? (
            favorites.map((offer) => (
              <OfferCard 
                key={offer.offer_id} 
                offer={offer} 
                onRemove={() => handleRemoveFavorite(offer.offer_id)} // Pass the handler
              />
            ))
          ) : (
            <p>You have no favorite offers.</p>
          )}
        </div>
      </div>
    </div>
  );
}
