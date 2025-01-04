import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HeartButton = ({ offerID, userID }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state for better UX

  // Fetch the favorite status from the backend
  const fetchFavouriteStatus = async () => {
    console.log('Fetching favorite status for user:', userID, 'and offer:', offerID);
    setLoading(true); // Set loading state while fetching

    try {
      const response = await axios.get(`/api/check-favorite/${userID}/${offerID}`);
      console.log('API Response:', response.data);

      // Extract and set the boolean value for isFavourite
      const isFavouriteBoolean = response.data.isFavourite?.isFavourite === true;
      console.log('Extracted boolean isFavourite:', isFavouriteBoolean);
      setIsFavourite(isFavouriteBoolean);
    } catch (error) {
      console.error("Error fetching favorite status:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch favorite status on mount or when userID/offerID changes
  useEffect(() => {
    if (userID && offerID) {
      fetchFavouriteStatus(); // Always fetch the current status on render
    }
  }, [userID, offerID]);

  // Toggle the favorite status
  const toggleFavourite = async () => {
    console.log('Toggling favorite status:', { userID, offerID, isFavourite });

    try {
      if (isFavourite) {
        // Remove from favorites
        await axios.delete(`/api/remove-favorite/${userID}/${offerID}`);
        console.log('Favorite removed successfully');
      } else {
        // Add to favorites
        await axios.post(`/api/add-favorite`, { userID, offerID });
        console.log('Favorite added successfully');
      }

      // Re-fetch the current favorite status after toggling
      await fetchFavouriteStatus();
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  // Debugging the state of isFavourite
  console.log('Current favorite status (isFavourite):', isFavourite);

  return (
    <button
      onClick={toggleFavourite}
      className="flex items-center justify-center"
      disabled={loading} // Disable button while loading
    >
      {loading ? (
        <span className="text-gray-500 text-2xl">...</span> // Loading state
      ) : isFavourite ? (
        <FaHeart className="text-red-500 text-2xl" /> // Red heart when favorited
      ) : (
        <FaRegHeart className="text-gray-500 text-2xl" /> // Gray heart when not favorited
      )}
    </button>
  );
};

export default HeartButton;
