import React , { memo } from 'react';
import { Link } from "react-router-dom";
import userfeatures1 from '../../assets/AboutusPics/user features (1).jpg';
import userfeatures2 from '../../assets/AboutusPics/user features (2).jpg';
import userfeatures3 from '../../assets/AboutusPics/user features (3).jpg';
import userfeatures4 from '../../assets/AboutusPics/user features.jpg';
import aboutusData from '../../assets/Aboutusdata/aboutusData.json';

const images = [
    userfeatures1,
    userfeatures2,
    userfeatures3,
    userfeatures4,
];
const FeatureSectionUser = memo(()=> {
 const { userFeatures } = aboutusData;
  return (
    <div className="mb-12">
      <h2 className="text-center text-3xl font-semibold text-black mb-4">{userFeatures.title}</h2>
      <p className="text-gray-600 mb-6">{userFeatures.description}</p>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Feature List */}
        <div
          className={`flex-1 p-6 rounded-lg shadow-md bg-[#4EB7AC] text-white flex flex-col justify-between`}
          style={{ minHeight: '300px' }} // Ensures alignment with the image grid
        >
          <ul className="space-y-10">
            {userFeatures.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-xl font-semibold">•</span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href="/search"
            className="mt-6 bg-white text-[#4EB7AC] font-semibold px-4 py-2 rounded shadow hover:bg-[#EAF5F4]  transition duration-300 text-center"
          ><Link to={`/search`}>
            Browse Offers
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
export default FeatureSectionUser;
