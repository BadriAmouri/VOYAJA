import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSmile, faClock } from '@fortawesome/free-solid-svg-icons';

// Reusable Card Component
const StatsCard = ({ icon, title, value }) => {
  return (
    <div className="text-left stat-box bg-white p-2 mb-2 max-w-xs mx-auto rounded-lg border border-gray-300 flex items-center space-x-2">
      {/* Icon */}
      <div className="stat-box-icon text-[#4EB7AC] ml-5 text-2xl">
        <FontAwesomeIcon icon={icon} />
      </div>
      {/* Title and Value */}
      <div className="mt-5 ">
        <h4 className="stat-box-title text-lg font-semibold ml-2">{title}</h4>
        <p className="stat-box-value text-md font-bold text-gray-800 ml-2">{value}</p>
      </div>
    </div>
  );
};

// Main Component to Render All Stats
const Stats = ({ values }) => {
  return (
    <div className="stat-wrapper mt-6">
      <StatsCard icon={faGlobe} title="Trips Organized" value={  " + " + values.tripsOrganized} />
      <StatsCard icon={faSmile} title="Happy Customers" value={ " + " +values.happyCustomers} />
      <StatsCard icon={faClock} title="Experience" value={values.experience + " Years"} />
    </div>
  );
};

export default Stats;
