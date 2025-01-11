import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideMenu from "./sideMenu";

const OffersTable = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/offers");
      console.log("Offers data:", response.data);
      setOffers(response.data);
      setFilteredOffers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extracts 'YYYY-MM-DD' format
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    setSearchTerm(searchValue);

    const filtered = offers.filter(
      (offer) =>
        offer.offer_dest.toLowerCase().includes(searchValue) ||
        formatDate(offer.starting_date).includes(searchValue) || // Search formatted date
        offer.duration.toString().includes(searchValue)
    );
    setFilteredOffers(filtered);
  };

  const handleRowClick = (offerId) => {
    navigate(`/offerDetailsAdmin/${offerId}`);
  };

  if (loading) {
    return <p>Loading offers...</p>;
  }

  return (
    <div className="flex flex-row items-start justify-between">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <div
        className="p-6 bg-white shadow-lg rounded-lg mb-10 text-black mt-10"
        style={{ marginLeft: "300px", width: "1180px" }}
      >
        <h1 className="text-2xl font-bold mb-4">Offers</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by location, start date, or duration"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Offers Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Start Date</th>
              <th className="px-4 py-2 border-b">Duration</th>
              <th className="px-4 py-2 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer) => (
                <tr
                  key={offer.offer_id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(offer.offer_id)}
                >
                  <td className="px-4 py-2 border-b">{offer.offer_name}</td>
                  <td className="px-4 py-2 border-b">{offer.offer_dest}</td>
                  <td className="px-4 py-2 border-b">
                    {formatDate(offer.starting_date)}
                  </td>
                  <td className="px-4 py-2 border-b">{offer.duration} Days</td>
                  <td className="px-4 py-2 border-b">{offer.min_price} DA</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-4 py-2 border-b text-gray-500"
                >
                  No offers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OffersTable;
