import React from "react";
import FileUploadForm from "./FileUploadForm.jsx";
import "../../Style/upload.css";

const ConfirmationPage = () => {
  return (
    <div className="confirmation-page">
      {/* First Row: Message and Instructions */}
      <div className="confirmation-message">
        <h2>Request Approved</h2>
        <p>
          Your request has been validated by the agency. Please proceed with the
          payment to finalize and confirm your booking. Below is the breakdown
          of the details:
        </p>
      </div>

      {/* Second Row: Flight details and Price breakdown */}
      <div className="details-breakdown">
        <h3>Booking Details</h3>
        <ul>
          <li>
            <strong>Destination:</strong> Paris, France
          </li>
          <li>
            <strong>Travel Date:</strong> December 20, 2024
          </li>
          <li>
            <strong>Return Date:</strong> December 27, 2024
          </li>
        </ul>

        <h3>Price Breakdown</h3>
        <ul>
          <li>
            <strong>Base Price:</strong> $1,200
          </li>
          <li>
            <strong>Taxes and Fees:</strong> $150
          </li>
          <li>
            <strong>Total:</strong> $1,350
          </li>
        </ul>
      </div>

      {/* Third Row: Upload Receipts */}
      <div className="upload-files-receipt">
        <h3>Upload Your Payment Receipt</h3>
        <p>
          To expedite the confirmation process, please upload a scanned copy of
          your payment receipt.
        </p>
        <FileUploadForm />
      </div>
    </div>
  );
};

export default ConfirmationPage;
