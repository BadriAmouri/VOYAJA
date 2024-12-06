import React, { useState } from 'react';
import '../../Style/ProfileTabs.css';

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tabP ${activeTab === index ? 'active' : ''}`} // Corrected className string interpolation
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </div>
      ))}
    </>
  );
};

export default Tabs;
