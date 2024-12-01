import React, { useState } from 'react';
import Header from '../NavBar';
import ProfileBanner from '../Profile/profileBanner';
import AccountDetails from '../Profile/AccountDetails';
import Tab from '../Profile/Tab';

const Profile = () => {



  return (
    <div>
      <ProfileBanner />
      <Tab/>
      <AccountDetails/>
    </div>
  );
};

export default Profile;
