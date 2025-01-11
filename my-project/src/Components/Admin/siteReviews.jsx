import React, { useEffect, useState } from "react";
import axios from "axios";
import SideMenu from "./sideMenu";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [clients, setClients] = useState([]); // To store client data
  const [loading, setLoading] = useState(true);

  // Fetch reviews and client data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsResponse, clientsResponse] = await Promise.all([
          axios.get("http://localhost:5000/admin/reviews"),
          axios.get("http://localhost:5000/admin/users"),
        ]);

        setReviews(reviewsResponse.data); // Set reviews data
        setClients(clientsResponse.data); // Set clients data
        console.log("Reviews data:", reviewsResponse.data);
        console.log("Clients data:", clientsResponse.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  const getClientName = (clientId) => {
    const client = clients.find((client) => client.client_id === clientId);
    return client
      ? `${client.client_first_name} ${client.client_last_name}`
      : "Unknown Client";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideMenu />
      <div
        className="flex-1 p-6"
        style={{ marginLeft: "300px", width: "1180px" }}
      >
        <div className="p-6 bg-white shadow-lg rounded-lg mb-10 text-black mt-10">
          <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>

          {loading ? (
            <div>Loading reviews...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.review_id}
                    className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {getClientName(review.client_id)}
                    </h2>
                    <p className="text-gray-600 mb-4">{review.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-yellow-500">{`Rating: ${review.rating}`}</span>
                      <span className="text-gray-400 text-sm">
                        {new Date(review.review_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No reviews found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviewsPage;
