import React from 'react';
import FeatureSectionAgency from './FeatureSectionAgency';
import FeatureSectionUser from './FeatureSectionUser';
import { Link } from "react-router-dom";



const KeyFeatures = () => {
  return (
    <div className="py-12 px-6">
      {/* Agency Features */}
      <FeatureSectionAgency/>

      {/* User Features */}
      <FeatureSectionUser/>
    </div>
  );
};

export default KeyFeatures;
