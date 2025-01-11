import React, { useState } from "react";
import "../../Style/upload.css";
import { useLocation } from "react-router-dom";

const FileUploadForm = ({
  type,
  message,
  bookingDetails,
  subject,
  agencyID,
}) => {
  //console.log("TYPE --> " + type);
  const [paymentReceiptFile, setPaymentReceiptFile] = useState(null);

  const handlePaymentReceiptChange = (event) => {
    setPaymentReceiptFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!paymentReceiptFile) {
      alert("Please upload a file.");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("file", paymentReceiptFile);
    formData.append("userId", bookingDetails.customer_id);
    formData.append("agencyId", agencyID);
    formData.append("content", "payement_reciept");
    formData.append("bookingId", bookingDetails.booking_id);

    try {
      const notificationResponse = await fetch(
        "/api/notifications/booking/receiptPayment",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("FORM DATA:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      if (!notificationResponse.ok) {
        throw new Error("Failed to send notification");
      }

      alert(
        `Payment Receipt uploaded successfully: ${paymentReceiptFile.name}`
      );
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification. Please try again.");
    }
  };

  return (
    <div className="app-container flex flex-col gap-4">
      {/* First Row: Message and Instructions */}
      <div className="confirmation-message">
        {type === "acceptation" ? (
          <h2 className="font-semibold">Request Approved</h2>
        ) : type === "validation" ? (
          <h2 className="font-semibold">Booking Confirmed</h2>
        ) : type === "adminreply" ? (
          <h2 className="font-semibold">{subject}</h2> // here using offer name as subject
        ) : (
          <h2 className="font-semibold">Request Rejected</h2>
        )}
        <p>{message}</p>
      </div>

      {type === "acceptation" && bookingDetails && (
        <div>
          {/* Second Row: Flight details and Price breakdown */}
          <div className="details-breakdown flex flex-col gap-4">
            <div>
              <h3 className="font-bold my-2">Booking Details</h3>
              <ul>
                <li>
                  <span className="font-medium">Customer Name:</span>{" "}
                  {bookingDetails.customer_name}{" "}
                  {bookingDetails.customer_surname}
                </li>
                <li>
                  <span className="font-medium">Phone:</span>{" "}
                  {bookingDetails.customer_phone}
                </li>
                <li>
                  <span className="font-medium">Destination:</span>{" "}
                  {bookingDetails.destination}
                </li>
                <li>
                  <span className="font-medium">Travel Date:</span>{" "}
                  {bookingDetails.goDate}
                </li>
                <li>
                  <span className="font-medium">Return Date:</span>{" "}
                  {bookingDetails.returnDate}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold my-2">Price Breakdown</h3>
              <ul>
                <li>
                  <span className="font-medium">Base Price:</span>{" "}
                  {bookingDetails.priceBreakdown.basePrice}
                </li>
                <li>
                  <span className="font-medium">Options Added:</span>
                  <ul>
                    {bookingDetails.priceBreakdown.optionsAdded.map(
                      (option, index) => (
                        <li key={index}>
                          {option.name}: ${option.price}
                        </li>
                      )
                    )}
                  </ul>
                </li>
                <li>
                  <span className="font-medium">Total:</span>{" "}
                  {bookingDetails.total_price}
                </li>
              </ul>
            </div>
          </div>

          {/* Third Row: Upload Receipts */}
          <div className="upload-files-receipt flex flex-col items-center">
            <div className="flex-start w-full">
              <h3 className="font-semibold">Upload Your Payment Receipt</h3>
              <p>
                To expedite the confirmation process, please upload a scanned
                copy of your payment receipt.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="file-upload-form_reciept">
              {/* Upload Box */}
              <label className="upload-box_reciept">
                <input
                  type="file"
                  onChange={handlePaymentReceiptChange}
                  accept=".pdf"
                  className="hidden-file-input"
                  required
                />
                <div className="upload-content_reciept">
                  <span className="upload-plus-icon">+</span>
                  <p className="upload-text">Upload Payment Receipt</p>
                </div>
              </label>

              {/* Show selected file name */}
              {paymentReceiptFile && (
                <p className="file-name">File: {paymentReceiptFile.name}</p>
              )}

              {/* Submit Button */}
              <button type="submit" className="submit-btn_reciept">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;
