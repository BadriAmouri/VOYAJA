import React, { useState, useEffect } from 'react';
import { MdEditDocument } from 'react-icons/md';
import { useAppContext } from '../../contexts/AppContext';
import '../../Style/AccountDetails.css';

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});  
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const { clientID } = useAppContext();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/client/${clientID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        const data = await response.json();
        setUser(data.user);
        setFormData({
          firstName: data.user.client_first_name,
          lastName: data.user.client_last_name,
          email: data.user.client_email,
          phoneNumber: data.user.client_phone_number,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, [clientID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setError(null);
  };

 
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(06|05|07)\d{8}$/;
    const nameRegex = /^[A-Za-z\s]+$/;  // Regex for alphabetic characters and spaces only

    
    if (!formData.firstName || !nameRegex.test(formData.firstName.trim())) {
      errors.firstName = 'First name should contain only letters and spaces';
    }

    // Validate last name
    if (!formData.lastName || !nameRegex.test(formData.lastName.trim())) {
      errors.lastName = 'Last name should contain only letters and spaces';
    }

    // Validate email
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'You should provide a valid email';
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'The phone number must be valid';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = async (field) => {
    if (!validateForm()) {
      return;  
    }

    const fieldMapping = {
      firstName: 'client_first_name',
      lastName: 'client_last_name',
      email: 'client_email',
      phoneNumber: 'client_phone_number',
    };
    const mappedField = fieldMapping[field];
    const value = formData[field];

    try {
      const response = await fetch(`/client/${clientID}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field: mappedField, value }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${field}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      toggleEdit(field);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = (field) => {
    // Reset the form data to the original values when discarding
    setFormData({
      firstName: user.client_first_name,
      lastName: user.client_last_name,
      email: user.client_email,
      phoneNumber: user.client_phone_number,
    });
    setFormErrors({}); // Clear any existing validation errors
    toggleEdit(field);  // Toggle editing state
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="AccountContainer">
      <h1 className="AccountTitle">Account Details</h1>
      <div className="account-details">
        {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
          <div key={field} className="detail-item">
            <div className="recored">
              <span className="detailLabel">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </span>
              {isEditing[field] ? (
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              ) : (
                <span className="detailValue">{formData[field]}</span>
              )}
            </div>
            {formErrors[field] && <div className="error-message">{formErrors[field]}</div>}
            <div className="button-container">
              {isEditing[field] ? (
                <>
                  <button
                    className="action-btn save-btn"
                    onClick={() => handleSubmit(field)}
                  >
                    Save
                  </button>
                  <button
                    className="action-btn cancel-btn"
                    onClick={() => handleCancel(field)} 
                  >
                    Discard
                  </button>
                </>
              ) : (
                <button
                  className="change-btn"
                  onClick={() => toggleEdit(field)}
                >
                  <MdEditDocument />
                  <span className="change-text">Change</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetails;
