import React from 'react';
import { useState, useEffect } from 'react';
import '../../Style/AccountDetails.css';
import { MdEditDocument } from "react-icons/md";
import { useAppContext } from '../../contexts/AppContext';

const AccountDetails = () => {
  const details = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john.doe@gmail.com', action: 'Add another email' },
    { label: 'Phone Number', value: '+1 000-000-0000' },
    { label: 'Address', value: '52 St. Main Downtown, Los Angeles, California, USA' },
    { label: 'Date of Birth', value: '01-01-1990' },
  ];
  const [user, setUser] = useState(null);  // To store user data
  const [error, setError] = useState(null);  // To handle errors
  const {isLoggedIn, setIsLoggedIn ,clientID ,setClientID} = useAppContext()
  useEffect(() => {
   
    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/client/${clientID}`);
        
        if (!response.ok) {
          throw new Error('User not found or error occurred');
        }
        
        const data = await response.json();
        setUser(data.user); // Update state with user data
        console.log("the data is ", data); // Logs the fetched data
      } catch (error) {
        setError(error.message); // Set error if any
      }
    };
    
    fetchUserInfo();
  }, []);  // Empty dependency array to run once on component mount

  // Logging user data when it's updated
  useEffect(() => {
    if (user) {
      console.log("the user DATA are:", user);
    }
  }, [user]); // This effect runs whenever `user` state changes

  
  // Render loading state until data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  // If error occurs, display error message
  if (error) {
    return <div>Error: {error}</div>;
  }
  

  return (
    <div className="AccountContainer">
      <div className="AccountTitle">Account</div>
      <div className="account-details">
      <div  className="detail-item">
            <div className="recored">
              <span className='detailLabel'>Name</span>
              <span className='detailValue'>{user.client_first_name} {user.client_last_name}</span>
            </div>
              <button className="change-btn">
                <MdEditDocument />
                <span className="change-text">Change</span>
              </button>
            
          </div>

          <div  className="detail-item">
            <div className="recored">
              <span className='detailLabel'>Email</span>
              <span className='detailValue'>{user.client_email}</span>
            </div>
              <button className="change-btn">
                <MdEditDocument />
                <span className="change-text">Change</span>
              </button>
            
          </div>

          <div  className="detail-item">
            <div className="recored">
              <span className='detailLabel'>Phone Number</span>
              <span className='detailValue'>{user.client_phone_number}</span>
            </div>
              <button className="change-btn">
                <MdEditDocument />
                <span className="change-text">Change</span>
              </button>
            
          </div>
      </div>
    </div>
  );
};

export default AccountDetails;
// 
