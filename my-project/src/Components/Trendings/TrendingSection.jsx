import React from 'react';
import TrendingCard from './TrendingCard.jsx';

import trend1 from '../../assets/HomePics/Umrah.jpg';
import trend2 from '../../assets/HomePics/summer.jpg';
import trend3 from '../../assets/HomePics/Modern.jpg'

const TrendingSection = () => {
  const destinations = [
    { image: trend1, location: 'Umrah', description: 'Find the best offers for Umrah with our agencies'},
    { image: trend2, location: 'Summer Holidays', description: 'Seacrh and find the best summer trip that suits you ' },
    { image: trend3, location: 'Modern Life Holidays', description: 'Seacrh and find the best Holiday offers that suits you ' },

  ];

  return (
    <>
    <div className="best ">
    <div className="Popular m-5 ml-0 "><h1 className='font-montserrat text-2xl font-semibold leading-[39px] text-left underline-offset-[3px] decoration-none'>Most Popular destinations</h1>
    <p className='font-montserrat text-base font-normal leading-[19.5px] text-left underline-offset-[3px] decoration-none'>find what interset people in this season and try to book yours with us </p></div>
    <div className="best-destinations grid grid-cols-3 gap-2 p-4">
      {destinations.map((dest, index) => (
        <TrendingCard
          key={index}
          image={dest.image}
          location={dest.location}
          description={dest.description}
        />
      ))}
    </div>
    </div>
    </>
  );
}

export default TrendingSection;
