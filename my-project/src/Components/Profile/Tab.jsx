import React from "react";
import Tabs from "./Tabs"; // Import the Tabs component
import "../../Style/ProfileTabs.css"; 

const Tab = () => {
  const tabs = ["Account", "History"];

  const handleTabChange = (index) => {
    console.log("Active tab index:", index); // Handle tab change logic here if needed
  };

  return (
    <div className="profile-tabs-container">
      <Tabs tabs={tabs} onTabChange={handleTabChange} />
    </div>
  );
};

export default Tab;
// 