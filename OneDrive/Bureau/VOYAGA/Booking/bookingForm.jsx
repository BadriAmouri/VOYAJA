import React from 'react';
import '../../Style/booking.css';

const BookingForm = ({ formData, formErrors, handleInputChange, handleBlur }) => {
  return (
    <div className="booking-form">
      <h3>Login or Sign up to book</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            className="form-input"
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            className="form-input"
          />
          {formErrors.surname && <p className="error-message">{formErrors.surname}</p>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            className="form-input"
          />
          {formErrors.phoneNumber && <p className="error-message">{formErrors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="numberOfPersons"
            placeholder="Number of Persons"
            value={formData.numberOfPersons}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            min="1"
            className="form-input"
          />
          {formErrors.numberOfPersons && <p className="error-message">{formErrors.numberOfPersons}</p>}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
