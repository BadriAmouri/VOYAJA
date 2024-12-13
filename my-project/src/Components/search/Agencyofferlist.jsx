import React, { useEffect }  from 'react';
import Agencyoffercard from './Agencyoffercard';
import { matchPlaceholderHeight } from '../../utils/pagination'; 


export default function Agencyofferlist({agency_name , agency_logo, offers ,itemsPerPage  }) {
   
   const placeholders = Array.from({ length: itemsPerPage - offers.length });
   useEffect(() => {
    // Match placeholder height after rendering
    matchPlaceholderHeight();
  
    // Optional: Add a resize listener to adjust height dynamically
    const handleResize = () => matchPlaceholderHeight();
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, [offers, itemsPerPage]);
  
  return (
    <div className="agencyoffer-list space-y-4"> {/* Added spacing between cards */}
      {offers.map((offer, index) => (
        <Agencyoffercard key={index} offer={offer} agency_logo={agency_logo} agency_name={agency_name} />
      ))}
     {placeholders.map((_, index) => (
        <div key={`placeholder-${index}`} className="agencyoffer-placeholder"></div>
      ))}
    </div>
  );
}
