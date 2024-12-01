import React, { useState } from 'react';
import '../../Style/Tabs.css';

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
          className={`tabP ${activeTab === index ? 'active' : ''}`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </div>
      ))}
      </>
  );
};

export default Tabs;
