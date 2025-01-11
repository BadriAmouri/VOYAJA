import React, { useEffect, useState } from "react";
import axios from "axios";
import SideMenu from "./sideMenu";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [offers, setOffers] = useState([]);
  const [options, setOptions] = useState({}); // Object to store options for each offer

  // Fetch the booking data along with offers and options
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingResponse = await axios.get(
          "http://localhost:5000/admin/bookings"
        );
        setBookings(bookingResponse.data);

        const offerResponse = await axios.get(
          "http://localhost:5000/api/offers"
        );
        setOffers(offerResponse.data);

        // Fetch options for each offer dynamically
        offerResponse.data.forEach(async (offer) => {
          const optionsResponse = await axios.get(
            `http://localhost:5000/api/option/${offer.offer_id}`
          );
          setOptions((prevOptions) => ({
            ...prevOptions,
            [offer.offer_id]: optionsResponse.data,
          }));
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookings();
  }, []);

  // Format the booking date to 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Find offer name by offer_id
  const getOfferName = (offerId) => {
    const offer = offers.find((offer) => offer.offer_id === offerId);
    return offer ? offer.offer_name : "Unknown Offer";
  };

  // Find selected options names by their IDs for the specific offer
  const getSelectedOptions = (optionIds, offerId) => {
    const offerOptions = options[offerId] || [];
    return optionIds
      .map((id) => {
        const option = offerOptions.find((option) => option.option_id === id);
        return option ? option.option_title : null; // Use option_title here
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SideMenu */}
      <SideMenu />

      {/* Main Content */}
      <div
        className="flex-1 p-6"
        style={{ marginLeft: "300px", width: "1180px" }}
      >
        <div className="p-6 bg-white shadow-lg rounded-lg mb-10 text-black mt-10">
          <h1 className="text-2xl font-bold mb-4">Bookings</h1>
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Customer Name</th>
                <th className="px-4 py-2 border-b">Phone Number</th>
                <th className="px-4 py-2 border-b">Total Price</th>
                <th className="px-4 py-2 border-b">Offer</th>
                <th className="px-4 py-2 border-b">Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.customer_id}>
                    <td className="px-4 py-2 border-b">
                      {booking.customer_name} {booking.customer_surname}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {booking.customer_phone}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {booking.total_price} DA
                    </td>
                    <td className="px-4 py-2 border-b">
                      {getOfferName(booking.offer_id)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {formatDate(booking.booking_date)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center px-4 py-2 border-b text-gray-500"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
