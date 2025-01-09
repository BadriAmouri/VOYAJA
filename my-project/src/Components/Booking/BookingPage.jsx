import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FlightDetails from "./flightDetails";
import PriceBreakdown from "./PriceBreakdown";
import BookingForm from "./bookingForm";
import Footer from "../Footer";
import "../../Style/booking.css";
import NavigationBar from "../NavigationBar/navigationBar";

const BookingPage = () => {
  const { offerid } = useParams();
  const [passportFile, setPassportFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    numberOfPersons: 1,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [modalType, setModalType] = useState("");
  const [offerName, setOfferName] = useState("");
  const [agencyID, setAgencyID] = useState(null);

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

    if (name === "name") {
      if (!value.trim()) {
        errors.name = "Name is required.";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errors.name = "Name must only contain letters.";
      } else {
        delete errors.name;
      }
    }

    if (name === "surname") {
      if (!value.trim()) {
        errors.surname = "Surname is required.";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errors.surname = "Surname must only contain letters.";
      } else {
        delete errors.surname;
      }
    }

    if (name === "phoneNumber") {
      if (!value.trim()) {
        errors.phoneNumber = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        errors.phoneNumber = "Phone number must be 10 digits.";
      } else {
        delete errors.phoneNumber;
      }
    }

    setFormErrors(errors);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Name must only contain letters.";
    }

    if (!formData.surname.trim()) {
      errors.surname = "Surname is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.surname)) {
      errors.surname = "Surname must only contain letters.";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!passportFile) {
      errors.passportFile = "Please upload your passport file.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formValidationErrors = validateForm();
    setFormErrors(formValidationErrors);

    if (Object.keys(formValidationErrors).length > 3) {
      setModalType("error");
      setShowModal(true);
      return;
    }

    if (!passportFile) {
      console.error("Passport file is missing.");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passportFile: "Passport file is required.",
      }));
      setModalType("error");
      setShowModal(true);
      return;
    }

    const simulatedPassportURL =
      "https://some-cloud-url.com/" + passportFile.name;

    // Booking payload
    const bookingPayload = {
      customer_name: formData.name,
      customer_surname: formData.surname,
      customer_phone: formData.phoneNumber,
      options_selected: selectedOptionIds,
      total_price: totalPrice,
      status: false,
      customer_id: 2,
      offer_id: offerid,
      reciept_url: "receipt_url",
      passports_urls: [simulatedPassportURL],
    };

    try {
      // First, create the booking
      const bookingResponse = await fetch("/api/booking/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to submit booking");
      }

      const bookingResult = await bookingResponse.json();

      // Then, send notification to agency
      const notificationPayload = {
        userId: 2,
        agencyId: agencyID,
        content: "request",
        bookingId: bookingResult.booking_id, // Use the booking ID from the response
      };
      console.log(
        "NOTIFICATION PAYLOAD: " + JSON.stringify(notificationPayload)
      );

      const notificationResponse = await fetch(
        "/api/notifications/booking/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationPayload),
        }
      );

      if (!notificationResponse.ok) {
        throw new Error("Failed to send notification");
      }

      setModalType("waiting");
      setShowModal(true);
    } catch (error) {
      console.error("Error:", error);
      setModalType("error");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="booking-page">
      <NavigationBar isLoggedIn={true} />
      <main>
        <div className="first-row_booking">
          <div className="first-column_booking">
            <div className="flight-details-container">
              <FlightDetails
                setOfferName={setOfferName}
                setAgencyID={setAgencyID}
              />
            </div>
            <div className="user-info-container">
              <BookingForm
                formData={formData}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
              />
            </div>
          </div>
          <div className="second-column_booking">
            <div className="price-breakdown-container">
              <PriceBreakdown
                setTotalPrice={setTotalPrice}
                setSelectedOptionIds={setSelectedOptionIds}
                offerName={offerName}
              />
            </div>
            <form onSubmit={handleSubmit} className="file-upload-form_booking">
              <label className="upload-box_passport">
                <input
                  type="file"
                  onChange={handlePassportChange}
                  accept=".pdf, .jpg, .png"
                  className="hidden-file-input"
                />
                <div className="upload-content_passport">
                  <span className="upload-plus-icon">+</span>
                  <p className="upload-text">Upload Passport</p>
                </div>
              </label>
              {passportFile && (
                <p className="file-name">Uploaded: {passportFile.name}</p>
              )}
              {formErrors.passportFile && (
                <p className="error">{formErrors.passportFile}</p>
              )}
              <button type="submit" className="submit-btn_booking">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {modalType === "waiting" ? (
              <>
                <h2>Waiting for Response</h2>
                <p>
                  Please wait for validation from the agency. You will be
                  notified shortly.
                </p>
                <button onClick={closeModal} className="modal-btn">
                  Close
                </button>
              </>
            ) : (
              <>
                {Object.entries(formErrors).map(
                  ([field, errorMessage], index) => (
                    <p key={index} className="error">
                      {errorMessage}
                    </p>
                  )
                )}
                <button onClick={closeModal} className="modal-btn">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
