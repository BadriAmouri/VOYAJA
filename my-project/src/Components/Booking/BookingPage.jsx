import React from 'react';
import Header from '../NavBar'; 
import FlightDetails from './flightDetails';
import PriceBreakdown from './PriceBreakdown';
import BookingForm from './bookingForm';
import FileUploadForm from './FileUploadForm';
import Footer from '../Footer';
import '../../Style/booking.css'

const BookingPage = () => {
  return (
    <div className="booking-page">
      
      <Header/>

      <main>
        {/* First Row: Flight details and Price breakdown */}
        <div className="first-row">
          <div className="first-column">
            <div className="flight-details-container">
              <FlightDetails />
            </div>
            <div className="user-info-container">
              <BookingForm />
            </div>
          </div>

          <div className="second-column">
            <div className="price-breakdown-container">
              <PriceBreakdown />
            </div>
            <div className="file-upload-container">
              <FileUploadForm />
            </div>
          </div>
        </div>

        {/* Optional: Additional second-row content, if necessary */}
        <div className="second-row">
          {/* Add any other content here if needed */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
