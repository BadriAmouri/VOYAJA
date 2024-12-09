import React from 'react';
import '../../Style/AccountDetails.css';
import { MdEditDocument } from "react-icons/md";

const AccountDetails = () => {
  const details = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john.doe@gmail.com', action: 'Add another email' },
    { label: 'Phone Number', value: '+1 000-000-0000' },
    { label: 'Address', value: '52 St. Main Downtown, Los Angeles, California, USA' },
    { label: 'Date of Birth', value: '01-01-1990' },
  ];

  return (
    <div className="AccountContainer">
      <div className="AccountTitle">Account</div>
      <div className="account-details">
        {details.map((detail, index) => (
          <div key={index} className="detail-item">
            <div className="recored">
              <span className='detailLabel'>{detail.label}</span>
              <span className='detailValue'>{detail.value}</span>
            </div>
            {detail.action ? (
              <button className="action-btn">
                <MdEditDocument />
                <span className="action-text">change</span>
              </button>
            ) : (
              <button className="change-btn">
                <MdEditDocument />
                <span className="change-text">Change</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetails;
// 
