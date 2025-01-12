import React from "react";
import Tabs from "./Tabs"; // Import the Tabs component
import "../../Style/ProfileTabs.css";

const Tab = ({ onTabChange }) => {
  const tabs = ["Account","Security", "History"];

  return (
    <div className="profile-tabs-container">
      <Tabs tabs={tabs} onTabChange={onTabChange} />
    </div>
  );
};

export default Tab;
