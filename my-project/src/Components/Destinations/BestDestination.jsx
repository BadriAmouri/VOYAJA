import React from 'react';
import DestinationCard from './Destinations.jsx';
import '../../Style/Destinations.css';

import dest1 from '../../assets/HomePics/dest1.jpg';
import dest2 from '../../assets/HomePics/dest2.jpg';
import dest3 from '../../assets/HomePics/dest3.jpg';
import dest4 from '../../assets/HomePics/dest4.jpg';
import dest5 from '../../assets/HomePics/dest5.jpg';
import dest6 from '../../assets/HomePics/dest6.jpg';
import dest7 from '../../assets/HomePics/dest7.jpg';
import dest8 from '../../assets/HomePics/dest8.jpg';
import dest9 from '../../assets/HomePics/dest9.jpg';

const BestDestinations = () => {
  const destinations = [
    { image: dest1, location: 'Istanbul ,Turkey', description: 'The City of Light' },
    { image: dest2, location: 'Male , Maldives', description: 'The City of Light' },
    { image: dest3, location: 'London , UK', description: 'The City of Light' },
    { image: dest4, location: 'Sydney , Australia', description: 'The City of Light' },
    { image: dest5, location: 'Paris , France', description: 'The City of Light' },
    { image: dest6, location: 'Tokyo, Japan', description: 'The City of Light' },
    { image: dest7, location: 'Baku , Azerbaijan', description: 'The City of Light' },
    { image: dest8, location: 'New York , USA', description: 'The City of Light' },
    { image: dest9, location: 'Dubai , UAE', description: 'The City of Light' },
  ];

  return (
    <>
    <div className="best ">
    <div className="Popular m-5 ml-0 "><h1 className='font-montserrat text-2xl font-semibold leading-[39px] text-left underline-offset-[3px] decoration-none'>Plan your perfect trip</h1>
    <p className='font-montserrat text-base font-normal leading-[19.5px] text-left underline-offset-[3px] decoration-none'>Search for the most suitable offers for you </p></div>
    <div className="best-destinations grid grid-cols-3 gap-2 p-4">
      {destinations.map((dest, index) => (
        <DestinationCard
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

export default BestDestinations;
