import React from 'react';
import OfferCard from './OfferCard';

export default function OfferList({ offers }) {
  return (
    <div className="boffer-list space-y-4"> {/* Added spacing between cards */}
      {offers.map((offer, index) => (
        <OfferCard key={index} offer={offer} />
      ))}
    </div>
  );
}
