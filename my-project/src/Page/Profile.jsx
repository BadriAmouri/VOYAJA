import React, { useState } from 'react';
import ProfileBanner from '../Components/Profile/profileBanner';
import Tab from '../Components/Profile/Tab';
import AccountDetails from '../Components/Profile/AccountDetails';
import HistoryView from '../Components/Profile/HistoryView';
import Footer from '../Components/Footer';
import Header from '../Components/NavBar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    if (activeTab === 0) {
      return <AccountDetails />;
    }
    if (activeTab === 1) {
      return <HistoryView />;
    }
    return null;
  };

  return (
    <div>
      <Header/>
      <ProfileBanner />
      <Tab onTabChange={setActiveTab} />
      <div className="tab-content">
        {renderContent()}
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
