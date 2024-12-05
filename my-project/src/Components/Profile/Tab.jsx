import React from "react";
import Tabs from "./Tabs"; // Import the Tabs component
import "../../Style/Tabs.css";

const Tab = ({ onTabChange }) => {
  const tabs = ["Account", "History"];

  return (
    <div className="profile-tabs-container">
      <Tabs tabs={tabs} onTabChange={onTabChange} />
    </div>
  );
};

export default Tab;
