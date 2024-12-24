import React from 'react';
import '../../Style/aboutus.css';
import aboutusData from '../../assets/Aboutusdata/aboutusData.json';
// Icon imports for vision, mission, and tagline. You can adjust the icons as needed.
import { FaEye, FaBullhorn, FaTag } from 'react-icons/fa';

const VisionMissionTagline = () => {
  const { coreBeliefs } = aboutusData;

  return (
    <div className="text-center py-16">
      <h2 className="font-montserrat text-3xl text-black text-center font-semibold mb-8"> {coreBeliefs.title}</h2>
      <div className="bBelief flex justify-center space-x-10">
        {/* Vision Card */}
        <div className="bvision w-72 bg-transparent p-6 shadow-lg rounded-xl space-y-4 hover:shadow-lg transform hover:-translate-y-2 transition duration-300">
          <div className="flex justify-center items-center bg-[#4EB7AC] text-white rounded-full w-16 h-16 mx-auto">
            <FaEye className="text-3xl" />
          </div>
          <h3 className="font-montserrat font-bold text-xl">Vision</h3>
          <p className="font-montserrat text-lg text-gray-700"> {coreBeliefs.beliefs[0].description}</p>
        </div>

        {/* Mission Card (slightly lower) */}
        <div className="bmission w-72 bg-transparent p-6 shadow-lg rounded-xl space-y-4 translate-y-8 hover:shadow-lg transform hover:-translate-y-2 transition duration-300">
          <div className="flex justify-center items-center bg-[#4EB7AC] text-white rounded-full w-16 h-16 mx-auto">
            <FaBullhorn className="text-3xl" />
          </div>
          <h3 className="font-montserrat font-bold text-xl">Mission</h3>
          <p className="font-montserrat text-lg text-gray-700"> {coreBeliefs.beliefs[1].description}</p>
        </div>

        {/* Tagline Card */}
        <div className="w-72 bg-transparent p-6 shadow-lg rounded-xl space-y-4 hover:shadow-lg transform hover:-translate-y-2 transition duration-300">
          <div className="flex justify-center items-center bg-[#4EB7AC] text-white rounded-full w-16 h-16 mx-auto">
            <FaTag className="text-3xl" />
          </div>
          <h3 className="font-montserrat font-bold text-xl">Tagline</h3>
          <p className="font-montserrat text-lg text-gray-700"> {coreBeliefs.beliefs[2].description}</p>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionTagline;
