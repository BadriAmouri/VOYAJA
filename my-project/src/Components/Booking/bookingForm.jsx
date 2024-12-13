import React from 'react';
import '../../Style/booking.css';

const BookingForm = ({ formData, formErrors, handleInputChange, handleBlur }) => {
  return (
    <div className="booking-form">
      <h3_booking>Login or Sign up to book</h3_booking>
      <form>
        <div className="form-group_booking">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            className="form-input_booking"
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>

        <div className="form-group_booking">
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            className="form-input_booking"
          />
          {formErrors.surname && <p className="error-message">{formErrors.surname}</p>}
        </div>
{/*  */}
{/*  */}
        <div className="form-group_booking">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            className="form-input_booking"
          />
          {formErrors.phoneNumber && <p className="error-message">{formErrors.phoneNumber}</p>}
        </div>

        <div className="form-group_booking">
          <input
            type="number"
            name="numberOfPersons"
            placeholder="Number of Persons"
            value={formData.numberOfPersons}
            onChange={handleInputChange}
            onBlur={handleBlur} // Trigger validation on blur
            min="1"
            className="form-input_booking"
          />
          {formErrors.numberOfPersons && <p className="error-message">{formErrors.numberOfPersons}</p>}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
