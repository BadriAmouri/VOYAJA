import React, { useState } from 'react';
import '../../Style/upload.css';

const FileUploadForm = () => {
  const [paymentReceiptFile, setPaymentReceiptFile] = useState(null);

  const handlePaymentReceiptChange = (event) => {
    setPaymentReceiptFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!paymentReceiptFile) {
      alert('Please upload a file.');
    } else {
      alert(`Payment Receipt: ${paymentReceiptFile.name}`);
    }
  };

  return (
    <div className="app-container">
   

      {/* Main Content */}
      <main className="upload-container_reciept">
        <form onSubmit={handleSubmit} className="file-upload-form_reciept">
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
          {paymentReceiptFile && <p className="file-name">File: {paymentReceiptFile.name}</p>}

          {/* Submit Button */}
          <button type="submit" className="submit-btn_reciept">
            Submit
          </button>
        </form>
      </main>

      {/* Footer */}
       
      <footer/>
    </div>
  );
};

export default FileUploadForm;
