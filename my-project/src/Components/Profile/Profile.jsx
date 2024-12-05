import React, { useState } from 'react';
import ProfileBanner from '../Profile/profileBanner';
import Tab from '../Profile/Tab';
import AccountDetails from '../Profile/AccountDetails';
import HistoryView from '../Profile/HistoryView';

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
      <ProfileBanner />
      <Tab onTabChange={setActiveTab} />
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
