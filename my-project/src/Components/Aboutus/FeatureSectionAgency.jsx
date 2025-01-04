import React , { memo } from 'react';
import { Link } from "react-router-dom";
import agencyfeatures1 from '../../assets/AboutusPics/agency features (1).jpg';
import agencyfeatures2 from '../../assets/AboutusPics/agency features (2).jpg';
import agencyfeatures3 from '../../assets/AboutusPics/agency features (3).jpg';
import agencyfeatures4 from '../../assets/AboutusPics/agency features (4).jpg';
import aboutusData from '../../assets/Aboutusdata/aboutusData.json';
const images = [
    agencyfeatures1,
    agencyfeatures2,
    agencyfeatures3,
    agencyfeatures4,
];

const FeatureSectionAgency = memo(()=> {
  const { agencyFeatures } = aboutusData;
  return (
    <div className="mb-12">
      <h2 className="text-center text-3xl font-semibold text-black mb-4">{agencyFeatures.title}</h2>
      <p className="text-gray-600 mb-6">{agencyFeatures.description}</p>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Feature List */}
        <div
          className={`flex-1 p-6 rounded-lg shadow-md bg-[#4EB7AC] text-white flex flex-col justify-between`}
          style={{ minHeight: '300px' }} // Ensures alignment with the image grid
        >
          <ul className="space-y-10">
            {agencyFeatures.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-xl font-semibold">•</span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href="/SignUp_Agency"
            className="mt-6 bg-white text-[#4EB7AC] font-semibold px-4 py-2 rounded shadow hover:bg-[#EAF5F4]  transition duration-300 text-center"
          ><Link to={`/SignUp_Agency`}>
            Sign Up
            </Link>
          </a>
        </div>

        {/* Images Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Feature ${index}`}
              className="w-full h-36 object-cover rounded-lg shadow-md" // Fixed size and consistent scaling
            />
          ))}
        </div>
      </div>
    </div>
  );
}
);
export default FeatureSectionAgency;
