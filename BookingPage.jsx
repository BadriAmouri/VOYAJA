import React, { useState } from 'react';
import Header from '../NavBar';
import FlightDetails from './flightDetails';
import PriceBreakdown from './PriceBreakdown';
import BookingForm from './bookingForm';
import Footer from '../Footer';
import '../../Style/booking.css';
import '../../Style/upload.css';

const BookingPage = () => {
  const [passportFile, setPassportFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    numberOfPersons: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [modalType, setModalType] = useState('');

  const handlePassportChange = (event) => {
    setPassportFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = { ...formErrors };

    // Name validation
    if (name === 'name') {
      if (!value.trim()) {
        errors.name = 'Name is required.';
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errors.name = 'Name must only contain letters.';
      } else {
        delete errors.name; // Clear the error if valid
      }
    }

    // Surname validation
    if (name === 'surname') {
      if (!value.trim()) {
        errors.surname = 'Surname is required.';
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errors.surname = 'Surname must only contain letters.';
      } else {
        delete errors.surname; // Clear the error if valid
      }
    }

    // Phone number validation
    if (name === 'phoneNumber') {
      if (!value.trim()) {
        errors.phoneNumber = 'Phone number is required.';
      } else if (!/^\d{10}$/.test(value)) {
        errors.phoneNumber = 'Phone number must be 10 digits.';
      } else {
        delete errors.phoneNumber; // Clear the error if valid
      }
    }

    setFormErrors(errors); // Update the errors state
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = 'Name must only contain letters.';
    }

    if (!formData.surname.trim()) {
      errors.surname = 'Surname is required.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.surname)) {
      errors.surname = 'Surname must only contain letters.';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits.';
    }

    if (!passportFile) {
      errors.passportFile = 'Please upload your passport file.';
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formValidationErrors = validateForm();
    setFormErrors(formValidationErrors);

    if (Object.keys(formValidationErrors).length > 0) {
      setModalType('error');
    } else {
      setModalType('waiting');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="booking-page">
      <Header />
      <main>
        <div className="first-row">
          <div className="first-column">
            <div className="flight-details-container">
              <FlightDetails />
            </div>
            <div className="user-info-container">
              <BookingForm
                formData={formData}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur} // Pass handleBlur to BookingForm
              />
            </div>
          </div>
          <div className="second-column">
            <div className="price-breakdown-container">
              <PriceBreakdown />
            </div>
            <form onSubmit={handleSubmit} className="file-upload-form">
              <label className="upload-box">
                <input
                  type="file"
                  onChange={handlePassportChange}
                  accept=".pdf, .jpg, .png"
                  className="hidden-file-input"
                />
                <div className="upload-content">
                  <span className="upload-plus-icon">+</span>
                  <p className="upload-text">Upload Passport</p>
                </div>
              </label>
              {passportFile && <p className="file-name">Uploaded: {passportFile.name}</p>}
              {formErrors.passportFile && <p className="error">{formErrors.passportFile}</p>}
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {modalType === 'waiting' ? (
              <>
                <h2>Waiting for Response</h2>
                <p>Please wait for validation from the agency. You will be notified shortly.</p>
                <button onClick={closeModal} className="modal-btn">Close</button>
              </>
            ) : (
              <>
                <h2>Form Errors</h2>
                {Object.entries(formErrors).map(([field, errorMessage], index) => (
                  <p key={index} className="error">{errorMessage}</p>
                ))}
                <button onClick={closeModal} className="modal-btn">Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
//