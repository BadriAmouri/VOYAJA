import React from 'react';
import '../../Style/HistoryView.css';

const HistoryView = () => {
  const travelHistory = [
    { date: '2023-01-10', destination: 'New York City', Agency: 'emarates' },
    { date: '2023-03-15', destination: 'Paris', Agency: 'emarates' },
    { date: '2023-07-22', destination: 'Tokyo', Agency: 'emarates' },
    { date: '2023-11-05', destination: 'Turkey', Agency: 'emarates' },
  ];

  return (
    <div className="history-container">
      <h2>Travel History</h2>
      <ul className="history-list">
        {travelHistory.map((entry, index) => (
          <li key={index} className="history-item">
            <span className="history-date">{entry.date}</span>
            <span className="history-destination">{entry.destination}</span>
            <span className="history-Agency">{entry.Agency}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryView;
