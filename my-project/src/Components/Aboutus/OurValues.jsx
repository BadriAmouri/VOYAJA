import React from 'react';
import '../../Style/aboutus.css';
import { FaHandshake, FaBalanceScale, FaStream, FaUserFriends } from 'react-icons/fa';
import ValueCard from './ValueCard';
import aboutusData from '../../assets/Aboutusdata/aboutusData.json';

const OurValues = () => {
 const { values } = aboutusData;
  const ourvalues = [
    { icon: FaHandshake, title: values.items[0] },
    { icon: FaBalanceScale, title:  values.items[1] },
    { icon: FaStream, title:  values.items[2] },
    { icon: FaUserFriends, title:  values.items[3] },
  ];

  return (
    <div className="py-16 ">
      <h2 className="text-center text-3xl font-semibold text-black mb-12">{values.title}</h2>
      <div className="bvalues flex justify-center space-x-10">
        {ourvalues.map((value, index) => (
          <ValueCard key={index} icon={value.icon} title={value.title} className={value.title} />
        ))}
      </div>
    </div>
  );
};

export default OurValues;
