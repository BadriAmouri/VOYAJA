import React, { useState } from "react";
import "../../Style/upload.css";

const FileUploadForm = ({ type, message, bookingDetails }) => {
  const [paymentReceiptFile, setPaymentReceiptFile] = useState(null);

  const handlePaymentReceiptChange = (event) => {
    setPaymentReceiptFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!paymentReceiptFile) {
      alert("Please upload a file.");
    } else {
      alert(`Payment Receipt: ${paymentReceiptFile.name}`);
    }
  };

  return (
    <div className="app-container flex flex-col gap-4">
      {/* First Row: Message and Instructions */}
      <div className="confirmation-message">
        {type == "acceptation" ? (
          <h2 className="font-semibold">Request Approved</h2>
        ) : type == "confirmation" ? (
          <h2 className="font-semibold">Booking Confirmed</h2>
        ) : (
          <h2 className="font-semibold">Request Rejected</h2>
        )}
        <p>{message}</p>
      </div>

      {type == "acceptation" ? (
        <div>
          {/* Second Row: Flight details and Price breakdown */}
          <div className="details-breakdown flex flex-col gap-4">
            <div>
              <h3 className="font-bold my-2">Booking Details</h3>
              <ul>
                <li>
                  <span className="font-medium">Destination:</span>{" "}
                  bookingDetails.destination
                </li>
                <li>
                  <span className="font-medium">Travel Date:</span>{" "}
                  bookingDetails.goDate
                </li>
                <li>
                  <span className="font-medium">Return Date:</span>{" "}
                  bookingDetails.returnDate
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold my-2">Price Breakdown</h3>
              <ul>
                <li>
                  <span className="font-medium">Base Price:</span>{" "}
                  bookingDetails.priceBreakdown.basePrice
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
                  bookingDetails.priceBreakdown
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
            <form onSubmit={handleSubmit} className="file-upload-form_reciept ">
              {/* Upload Box */}
              <label className="upload-box_reciept">
                <input
                  type="file"
                  onChange={handlePaymentReceiptChange}
                  accept=".pdf, .jpg, .png"
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
      ) : null}
    </div>
  );
};

export default FileUploadForm;
