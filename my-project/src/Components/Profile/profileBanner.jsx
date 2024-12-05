import React from 'react';
import '../../Style/ProfileBanner.css';

import image1 from '../../assets/Profile/bg.jpg';
import image2 from '../../assets/Profile/user.jpg';
import { IoIosCloudUpload } from "react-icons/io";


const ProfileBanner = () => {
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
