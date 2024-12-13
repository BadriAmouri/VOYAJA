import React from 'react';
import '../../Style/ProfileBanner.css';
import { useState,useEffect } from 'react';
import image1 from '../../assets/Profile/bg.jpg';
import image2 from '../../assets/Profile/user.jpg';
import { IoIosCloudUpload } from "react-icons/io";


const ProfileBanner = () => {
  const [user, setUser] = useState(null);  // To store user data
  const [error, setError] = useState(null);  // To handle errors

  useEffect(() => {
    const clientId = 1; // Replace with dynamic clientId (e.g., from auth context or URL)
    
    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/client/${clientId}`);
        
        if (!response.ok) {
          throw new Error('User not found or error occurred');
        }
        
        const data = await response.json();
        setUser(data.user); // Update state with user data
        console.log("the data is ",data);
        console.log("the user DATA are :",user);
      } catch (error) {
        setError(error.message); // Set error if any
      }
    };
    
    fetchUserInfo();
  }, []);  // Empty dependency array to run once on component mount

  return (
    <div className="profile-banner">
      <div className="banner">
        <img src={image1} className='bg'/>
       
        
        <div className="profile-photo">
        <img src={image2} alt="Profile" />
      </div>
      </div>
      <div className="profile-info">
        <h2>John Doe</h2>
        <p>john.doe@gmail.com</p>
      </div>
    </div>
  );
};

export default ProfileBanner;
// 
