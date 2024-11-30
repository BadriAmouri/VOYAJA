import React from 'react';
import Agencyoffercard from './Agencyoffercard';

export default function Agencyofferlist({ offers ,itemsPerPage  }) {
   const placeholders = Array.from({ length: itemsPerPage - offers.length });
  return (
    <div className="agencyoffer-list space-y-4"> {/* Added spacing between cards */}
      {offers.map((offer, index) => (
        <Agencyoffercard key={index} offer={offer} />
      ))}
     {placeholders.map((_, index) => (
        <div key={`placeholder-${index}`} className="agencyoffer-placeholder"></div>
      ))}
    </div>
  );
}
