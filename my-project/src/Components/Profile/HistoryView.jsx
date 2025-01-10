

// export default HistoryView;
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import '../../Style/HistoryView.css';

const HistoryView = () => {
  const [travelHistory, setTravelHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {isLoggedIn, setIsLoggedIn ,clientID ,setClientID} = useAppContext();
// 
  // 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/booking/getHistory/${clientID}`);

        if (!response.ok) {
          throw new Error(`Error fetching history: ${response.statusText}`);
        }
        const data = await response.json();
        setTravelHistory(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="history-container">Loading travel history...</div>;
  }

  if (error) {
    return <div className="history-container">Error: {error}</div>;
  }

  return (
    <div className="history-container">
      <h2>Travel History</h2>
      <ul className="history-list">
      {travelHistory.map((entry, index) => (
  <li key={index} className="history-item">
    <span className="history-offer">{entry.offer_name}</span>
    <span className="history-destination">{entry.offer_dest}</span>
    <span className="history-date">{new Date(entry.starting_date).toLocaleDateString()}</span>
    <span className="history-price">${entry.total_price}</span>
  </li>
))}

      </ul>
    </div>
  );
};

export default HistoryView;
