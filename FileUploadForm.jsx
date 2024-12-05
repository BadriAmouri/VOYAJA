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
      {/* Navbar */}
      <header className="navbar">
        <h1>My App</h1>
      </header>

      {/* Main Content */}
      <main className="upload-container">
        <form onSubmit={handleSubmit} className="file-upload-form">
          {/* Upload Box */}
          <label className="upload-box">
            <input
              type="file"
              onChange={handlePaymentReceiptChange}
              accept=".pdf, .jpg, .png"
              className="hidden-file-input"
              required
            />
            <div className="upload-content">
              <span className="upload-plus-icon">+</span>
              <p className="upload-text">Upload Payment Receipt</p>
            </div>
          </label>

          {/* Show selected file name */}
          {paymentReceiptFile && <p className="file-name">File: {paymentReceiptFile.name}</p>}

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
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
