import React, { useState, useEffect } from 'react';
import '../../Style/ProfileBanner.css';
import image1 from '../../assets/Profile/bg.jpg';
import image2 from '../../assets/Profile/user.jpg';
import { IoIosCloudUpload } from "react-icons/io";
import { useAppContext } from '../../contexts/AppContext';

const ProfileBanner = () => {
  const [user, setUser] = useState(null);  // To store user data
  const [error, setError] = useState(null);  // To handle errors
  const {isLoggedIn, setIsLoggedIn ,clientID ,setClientID} = useAppContext();

  useEffect(() => {
   
    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/client/${clientID}`);
        
        if (!response.ok) {
          throw new Error('User not found or error occurred');
        }
        
        const data = await response.json();
        setUser(data.user); // Update state with user data
        console.log("the data is ", data); // Logs the fetched data
      } catch (error) {
        setError(error.message); // Set error if any
      }
    };
    
    fetchUserInfo();
  }, []);  // Empty dependency array to run once on component mount

  // Logging user data when it's updated
  useEffect(() => {
    if (user) {
      console.log("the user DATA are:", user);
    }
  }, [user]); // This effect runs whenever `user` state changes

  // Render loading state until data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  // If error occurs, display error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-banner">
      <div className="banner">
        <img src={image1} className="bg" alt="Background" />
        
        <div className="profile-photo">
          <img src={image2} alt="Profile" />
        </div>
      </div>
      <div className="profile-info">
        <h2>{user.client_first_name} {user.client_last_name}</h2>
        <p>{user.client_email}</p>
      </div>
    </div>
  );
};

export default ProfileBanner;
